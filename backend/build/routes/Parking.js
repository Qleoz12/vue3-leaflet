"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Parkings_1 = __importDefault(require("../controllers/Parkings"));
const router = express_1.default.Router();
router.post('/create', Parkings_1.default.createBook);
router.get('/get/:parkingId', Parkings_1.default.readBook);
router.get('/get/', Parkings_1.default.readAll);
module.exports = router;
