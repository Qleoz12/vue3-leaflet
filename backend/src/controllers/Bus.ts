import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Bus from '../models/Bus';

const createBus = (req: Request, res: Response, next: NextFunction) => {
    const { alias, placa,locations} = req.body;

    const bus = new Bus({
        _id: new mongoose.Types.ObjectId(),
        alias,
        placa,
        locations
    });
    console.log(bus)
    return bus
        .save()
        .then((bus) => res.status(201).json({ bus }))
        .catch((error) => res.status(500).json({ error }));
};

const readBus = (req: Request, res: Response, next: NextFunction) => {
    const BusId = req.params.BusId;

    return Bus.findById(BusId)
        .populate('author')
        .then((Bus) => (Bus ? res.status(200).json({ Bus }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Bus.find()
        .then((buss) => res.status(200).json({ buss }))
        .catch((error) => res.status(500).json({ error }));
};

// const updateBus = (req: Request, res: Response, next: NextFunction) => {
//     const BusId = req.params.BusId;

//     return Bus.findById(BusId)
//         .then((Bus) => {
//             if (Bus) {
//                 Bus.set(req.body);

//                 return Bus
//                     .save()
//                     .then((Bus) => res.status(201).json({ Bus }))
//                     .catch((error) => res.status(500).json({ error }));
//             } else {
//                 return res.status(404).json({ message: 'not found' });
//             }
//         })
//         .catch((error) => res.status(500).json({ error }));
// };

// const deleteBus = (req: Request, res: Response, next: NextFunction) => {
//     const BusId = req.params.BusId;

//     return Bus.findByIdAndDelete(BusId)
//         .then((Bus) => (Bus ? res.status(201).json({ Bus, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
//         .catch((error) => res.status(500).json({ error }));
// };

 export default { createBus, readBus, readAll } //updateBus, deleteBus };
