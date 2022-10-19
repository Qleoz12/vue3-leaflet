import express from 'express';
import controller from '../controllers/trip';
import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

router.post('/create', ValidateJoi(Schemas.trip.create), controller.createTrip);
router.get('/get/:parkingId', controller.readTrip);
router.get('/get/', controller.readAll);
router.put('/update/:TripId', controller.updateTrip);
// router.delete('/delete/:parkingId', controller.deleteBook);

export = router;
