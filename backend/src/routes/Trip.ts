import express from 'express';
import controller from '../controllers/trip';
import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

router.post('/create', ValidateJoi(Schemas.trip.create), controller.createTrip);
router.get('/get/:parkingId', controller.readTrip);
router.get('/get/', controller.readAll);
// router.patch('/update/:parkingId', ValidateJoi(Schemas.parking.update), controller.updateBook);
// router.delete('/delete/:parkingId', controller.deleteBook);

export = router;
