import express from 'express';
import controller from '../controllers/Schedule';
import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

router.post('/create', controller.createSchedule);
router.get('/get/:parkingId', controller.readSchedule);
router.get('/get/', controller.readAll);
// router.patch('/update/:parkingId', ValidateJoi(Schemas.parking.update), controller.updateBook);
// router.delete('/delete/:parkingId', controller.deleteBook);

export = router;
