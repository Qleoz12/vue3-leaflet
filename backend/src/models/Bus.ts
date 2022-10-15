import mongoose, { Document, Schema } from 'mongoose';


export interface IBus {
    alias: string;
    placa: string;
    locations: {
            lat: Number, 
            lng: Number
        };
}

export interface IBusModel extends IBus, Document {}



const BusSchema: Schema = new Schema(
    {
        alias: { type: String, required: true },
        placa: { type: String, required: true },
        locations: {
            lat: Number, 
            lng: Number
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IBusModel>('Bus', BusSchema);
