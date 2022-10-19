
import mongoose from 'mongoose';
import BusParking from '../models/BusParking';
import Parking from '../models/Parking';
import Schedule from '../models/Schedule';


export default class BusparkingService {

    constructor(){}

    static async readAll()
    {
        
    }
    

    static async createBusParking(bus_placa: any, parking_alias: any)
    {
    
        let status = true;
    
        return BusParking.findOne({ bus_placa: bus_placa, status: true })
            .then((rs) => {
                if (rs) throw { "message": "already at parking" };
            })
            .then(async () => {
    
                let spacesUsage = await BusParking.findOne({ parking_alias: parking_alias, status: true }).count().exec()
                let spaces = await Parking.findOne({ name: parking_alias, status: true }).exec()
    
                let workhour = await Schedule.findOne({ parking_alias: parking_alias, status: true }).exec()
                if (workhour == undefined) {
                    throw { message: "not schedule for parking" };
                }
                const now = new Date();
    
                console.log(now.toLocaleTimeString);
                if (spaces != undefined && spacesUsage >= spaces.capacity) {
                    throw { message: "not free spaces at parking" };
                }
                
                let opening=toSeconds(workhour.opening)
                let closing=toSeconds(workhour.closing)
                let current=toSeconds(now.toLocaleTimeString())
                
                if(opening>current
                    || closing<=current)
                {
                    throw { message: "parking closed" };
                }
    
            })
            .then(() => {
                const busParking = new BusParking({
                    _id: new mongoose.Types.ObjectId(),
                    bus_placa,
                    parking_alias,
                    status
                });
                console.log(busParking)
                return busParking
                    .save()
            })
    };
    

    static async updateBusparkingService(BusParkingId: any, body: any) {


        return BusParking.findById(BusParkingId)
            .then((BusParking) => {
                if (BusParking) {
                    BusParking.set(body);

                    return BusParking
                        .save()
                        .then((BusParking) => { return BusParking })
                        .catch((error) => {
                            throw {
                                message: error
                            }
                        });
                } else {
                    throw {
                        message: 'not found'
                    };
                }
            })
            .catch((error) => { throw error });
    }

}

function toSeconds(t:any) {
    var bits = t.split(':');
    return bits[0]*3600 + bits[1]*60 ;
}

