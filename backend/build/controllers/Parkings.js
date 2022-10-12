"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Parking_1 = __importDefault(require("../models/Parking"));
const createBook = (req, res, next) => {
    const { name, locations } = req.body;
    console.log(locations);
    const park = new Parking_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name,
        locations
    });
    console.log(park);
    return park
        .save()
        .then((park) => res.status(201).json({ park }))
        .catch((error) => res.status(500).json({ error }));
};
const readBook = (req, res, next) => {
    const bookId = req.params.bookId;
    return Parking_1.default.findById(bookId)
        .populate('author')
        .then((book) => (book ? res.status(200).json({ book }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const readAll = (req, res, next) => {
    return Parking_1.default.find()
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
exports.default = { createBook, readBook, readAll }; //updateBook, deleteBook };
