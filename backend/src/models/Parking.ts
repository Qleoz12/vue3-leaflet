import mongoose, { Document, Schema } from 'mongoose';


export interface IParking {
    name: string;
    locations: {
            lat: Number, 
            lng: Number
        };
}

export interface IParkingModel extends IParking, Document {}



const ParkingSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        locations: {
            lat: Number, 
            lng: Number
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IParkingModel>('Parking', ParkingSchema);
