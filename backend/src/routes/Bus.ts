import express from 'express';
import controller from '../controllers/Bus';
import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

router.post('/create', controller.createBus);
router.get('/get/:parkingId', controller.readBus);
router.get('/get/', controller.readAll);
// router.patch('/update/:parkingId', ValidateJoi(Schemas.parking.update), controller.updateBook);
// router.delete('/delete/:parkingId', controller.deleteBook);

export = router;
