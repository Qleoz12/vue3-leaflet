import express from 'express';
import controller from '../controllers/BusParking';
import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

router.post('/create', controller.createBusParking);
router.get('/get/:busParkingId', controller.readBusParking);
router.get('/get/', controller.readAll);
router.patch('/update/:busParkingId', controller.updateBusParking);
// router.delete('/delete/:parkingId', controller.deleteBook);

export = router;
