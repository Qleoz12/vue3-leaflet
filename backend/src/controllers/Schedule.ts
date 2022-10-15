import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Logging from '../library/Logging';
import Schedule from '../models/Schedule';

const createSchedule = (req: Request, res: Response, next: NextFunction) => {
    const { parking_alias, opening,closing,m,t,w,th,f,st,sn} = req.body;

    let previus_schedule=null
    Schedule.findOne({ parking_alias: parking_alias,status:true })
    .then((rs)=>{
        if (rs) throw {"message": "already created"} ;
    })
    .then(()=>{
        const schedule = new Schedule({
            _id: new mongoose.Types.ObjectId(),
            parking_alias,
            opening,
            closing,
            m,
            t,
            w,
            th,
            f,
            st,
            sn
         });
        console.log(schedule)
        return schedule.save()
           
    })
    .then((schedule) => res.status(201).json({ schedule }))
    .catch((error) => res.status(500).json({ error }));
   

    

    
};

const readSchedule = (req: Request, res: Response, next: NextFunction) => {
    const ScheduleId = req.params.ScheduleId;

    return Schedule.findById(ScheduleId)
        .populate('author')
        .then((Schedule) => (Schedule ? res.status(200).json({ Schedule }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Schedule.find()
        .then((schedule) => res.status(200).json({ schedule }))
        .catch((error) => res.status(500).json({ error }));
};

// const updateSchedule = (req: Request, res: Response, next: NextFunction) => {
//     const ScheduleId = req.params.ScheduleId;

//     return Schedule.findById(ScheduleId)
//         .then((Schedule) => {
//             if (Schedule) {
//                 Schedule.set(req.body);

//                 return Schedule
//                     .save()
//                     .then((Schedule) => res.status(201).json({ Schedule }))
//                     .catch((error) => res.status(500).json({ error }));
//             } else {
//                 return res.status(404).json({ message: 'not found' });
//             }
//         })
//         .catch((error) => res.status(500).json({ error }));
// };

// const deleteSchedule = (req: Request, res: Response, next: NextFunction) => {
//     const ScheduleId = req.params.ScheduleId;

//     return Schedule.findByIdAndDelete(ScheduleId)
//         .then((Schedule) => (Schedule ? res.status(201).json({ Schedule, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
//         .catch((error) => res.status(500).json({ error }));
// };

 export default { createSchedule, readSchedule, readAll } //updateSchedule, deleteSchedule };
