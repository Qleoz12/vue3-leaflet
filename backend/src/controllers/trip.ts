import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Trip from '../models/Trip';
import Parking from '../models/Parking';
import Schedule from '../models/Schedule';
import BusParking from '../models/BusParking';
import BusparkingService from '../services/BusparkingService';


const createTrip = (req: Request, res: Response, next: NextFunction) => {
    const { origen,
        destino,
        leaving,
        arriving,
        bus_placa } = req.body;

    let status = true;

    Trip.findOne({ bus_placa: bus_placa, status: true })
        .then((rs) => {
            if (rs) throw { "message": "already at trip" };
        })
        .then(async () => {

            let spacesUsage = await BusParking.find({ parking_alias: destino, status: true }).exec()
            let spaces = await Parking.findOne({ name: destino, status: true }).exec()

            if (spaces != undefined && spacesUsage.length >= spaces.capacity) {
                throw { message: "not free spaces at parking" };
            }

            let parkingSchedule = await Schedule.findOne({ parking_alias: destino, status: true }).exec()
            if (parkingSchedule == undefined) {
                throw { message: "not shcedule!" };
            }
            let opening=toSeconds(parkingSchedule.opening)
            let closing=toSeconds(parkingSchedule.closing)
            let current=toSeconds(arriving)
            
            if(opening>current
                || closing<=current)
            {
                throw { message: "parking closed" };
            }
            
            let busparkingtoupdated = await BusParking.findOne({ bus_placa: bus_placa, status: true }).exec()
            let BusparkingServicers
            if (busparkingtoupdated != undefined) {
                busparkingtoupdated.status=false
                BusparkingServicers=await BusparkingService.updateBusparkingService(busparkingtoupdated.id,busparkingtoupdated)
            }
            else
            {
                BusparkingServicers= await BusparkingService.createBusParking(bus_placa,destino)

            }
            
            const trip = new Trip({
                _id: new mongoose.Types.ObjectId(),
                origen,
                destino,
                leaving,
                arriving,
                bus_placa,
                status
            });
            console.log(Trip)
            return trip
                .save()


        })
        .then((Trip) => res.status(201).json({ Trip }))
        .catch((error) => res.status(500).json({ error }));
};

const readTrip = (req: Request, res: Response, next: NextFunction) => {
    const TripId = req.params.TripId;

    return Trip.findById(TripId)
        .populate('author')
        .then((Trip) => (Trip ? res.status(200).json({ Trip }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Trip.find()
        .then((trips) => res.status(200).json({ trips }))
        .catch((error) => res.status(500).json({ error }));
};

function toSeconds(t: any) {
    var bits = t.split(':');
    return bits[0] * 3600 + bits[1] * 60;
}

const updateTrip = (req: Request, res: Response, next: NextFunction) => {
    const TripId = req.params.TripId;

    return Trip.findById(TripId)
        .then((Trip) => {
            if (Trip) {
                Trip.set(req.body);

                return Trip
                    .save()
                    .then((Trip) => res.status(201).json({ Trip }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

// const deleteTrip = (req: Request, res: Response, next: NextFunction) => {
//     const TripId = req.params.TripId;

//     return Trip.findByIdAndDelete(TripId)
//         .then((Trip) => (Trip ? res.status(201).json({ Trip, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
//         .catch((error) => res.status(500).json({ error }));
// };

export default { createTrip, readTrip, readAll, updateTrip } //updateTrip, deleteTrip };


