import mongoose, { Document, Schema } from 'mongoose';


export interface IBusParking {
    bus_placa: string;
    parking_alias: string;
    status:boolean
}

export interface IBusParkingModel extends IBusParking, Document {}



const BusParkingSchema: Schema = new Schema(
    {
        bus_placa: { type: String, required: true },
        parking_alias: { type: String, required: true },
        status: Boolean
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IBusParkingModel>('BusParking', BusParkingSchema);
