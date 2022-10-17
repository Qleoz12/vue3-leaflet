import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import BusParking from '../models/BusParking';
import Parking from '../models/Parking';
import Schedule from '../models/Schedule';
import BusparkingService from '../services/BusparkingService';


const createBusParking = (req: Request, res: Response, next: NextFunction) => {
    const { bus_placa, parking_alias } = req.body;

    let status = true;

    BusParking.findOne({ bus_placa: bus_placa, status: true })
        .then((rs) => {
            if (rs) throw { "message": "already at parking" };
        })
        .then(async () => {

            let spacesUsage = await BusParking.findOne({ parking_alias: parking_alias, status: true }).count().exec()
            let spaces = await Parking.findOne({ name: parking_alias, status: true }).exec()

            let workhour = await Schedule.findOne({ parking_alias: parking_alias, status: true }).exec()
            if (workhour == undefined) {
                throw { message: "not schedule for parking" };
            }
            const now = new Date();

            console.log(now.toLocaleTimeString);
            if (spaces != undefined && spacesUsage >= spaces.capacity) {
                throw { message: "not free spaces at parking" };
            }
            
            let opening=toSeconds(workhour.opening)
            let closing=toSeconds(workhour.closing)
            let current=toSeconds(now.toLocaleTimeString())
            
            if(opening>current
                || closing<=current)
            {
                throw { message: "parking closed" };
            }

        })
        .then(() => {
            const busParking = new BusParking({
                _id: new mongoose.Types.ObjectId(),
                bus_placa,
                parking_alias,
                status
            });
            console.log(busParking)
            return busParking
                .save()
        })
        .then((busParking) => res.status(201).json({ busParking }))
        .catch((error) => res.status(500).json({ error }));
};

const readBusParking = (req: Request, res: Response, next: NextFunction) => {
    const BusParkingId = req.params.BusParkingId;

    return BusParking.findById(BusParkingId)
        .then((BusParking) => (BusParking ? res.status(200).json({ BusParking }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return BusParking.find()
        .then((busParkings) => res.status(200).json({ busParkings }))
        .catch((error) => res.status(500).json({ error }));
};

function toSeconds(t:any) {
    var bits = t.split(':');
    return bits[0]*3600 + bits[1]*60 ;
}

const updateBusParking = (req: Request, res: Response, next: NextFunction) => {
    const BusParkingId = req.params.busParkingId;
    BusparkingService.updateBusparkingService(BusParkingId,req.body)
    .then((busParkings) => res.status(200).json({ busParkings }))
    .catch((error) => res.status(500).json({ error }));
};

// const deleteBusParking = (req: Request, res: Response, next: NextFunction) => {
//     const BusParkingId = req.params.BusParkingId;

//     return BusParking.findByIdAndDelete(BusParkingId)
//         .then((BusParking) => (BusParking ? res.status(201).json({ BusParking, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
//         .catch((error) => res.status(500).json({ error }));
// };

export default { createBusParking, readBusParking, readAll, updateBusParking } //updateBusParking, deleteBusParking };
