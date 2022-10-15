import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Parking from '../models/Parking';

const createBook = (req: Request, res: Response, next: NextFunction) => {
    const { name, locations,capacity} = req.body;

    const park = new Parking({
        _id: new mongoose.Types.ObjectId(),
        name,
        locations,
        capacity
    });
    console.log(park)
    return park
        .save()
        .then((park) => res.status(201).json({ park }))
        .catch((error) => res.status(500).json({ error }));
};

const readBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    return Parking.findById(bookId)
        .populate('author')
        .then((book) => (book ? res.status(200).json({ book }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Parking.find()
        .then((parks) => res.status(200).json({ parks }))
        .catch((error) => res.status(500).json({ error }));
};

// const updateBook = (req: Request, res: Response, next: NextFunction) => {
//     const bookId = req.params.bookId;

//     return Book.findById(bookId)
//         .then((book) => {
//             if (book) {
//                 book.set(req.body);

//                 return book
//                     .save()
//                     .then((book) => res.status(201).json({ book }))
//                     .catch((error) => res.status(500).json({ error }));
//             } else {
//                 return res.status(404).json({ message: 'not found' });
//             }
//         })
//         .catch((error) => res.status(500).json({ error }));
// };

// const deleteBook = (req: Request, res: Response, next: NextFunction) => {
//     const bookId = req.params.bookId;

//     return Book.findByIdAndDelete(bookId)
//         .then((book) => (book ? res.status(201).json({ book, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
//         .catch((error) => res.status(500).json({ error }));
// };

 export default { createBook, readBook, readAll } //updateBook, deleteBook };
