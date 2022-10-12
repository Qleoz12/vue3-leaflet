import express from 'express';
import controller from '../controllers/Parkings';
import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

router.post('/create', ValidateJoi(Schemas.parking.create), controller.createBook);
router.get('/get/:parkingId', controller.readBook);
router.get('/get/', controller.readAll);
// router.patch('/update/:parkingId', ValidateJoi(Schemas.parking.update), controller.updateBook);
// router.delete('/delete/:parkingId', controller.deleteBook);

export = router;
