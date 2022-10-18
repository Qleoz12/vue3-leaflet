import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import BusParking from '../models/BusParking';
import Parking from '../models/Parking';
import Schedule from '../models/Schedule';
import BusparkingService from '../services/BusparkingService';


const createBusParking = (req: Request, res: Response, next: NextFunction) => {
    const { bus_placa, parking_alias } = req.body;

    let status = true;

    BusparkingService.createBusParking(bus_placa, parking_alias)
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
    return BusParking.find().sort('-status')
        .then((busParkings) => res.status(200).json({ busParkings }))
        .catch((error) => res.status(500).json({ error }));
};

function toSeconds(t: any) {
    var bits = t.split(':');
    return bits[0] * 3600 + bits[1] * 60;
}

const updateBusParking = (req: Request, res: Response, next: NextFunction) => {
    const BusParkingId = req.params.busParkingId;
    BusparkingService.updateBusparkingService(BusParkingId, req.body)
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
