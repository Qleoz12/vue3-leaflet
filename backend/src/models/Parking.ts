import mongoose, { Document, Schema } from 'mongoose';


export interface IParking {
    name: string;
    locations: {
            lat: Number, 
            lng: Number
        };
    capacity: number
    disponible: number
}

export interface IParkingModel extends IParking, Document {}



const ParkingSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        locations: {
            lat: Number, 
            lng: Number
        },
        capacity: Number,
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IParkingModel>('Parking', ParkingSchema);
