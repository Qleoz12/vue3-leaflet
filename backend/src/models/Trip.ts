import mongoose, { Document, Schema } from 'mongoose';


export interface ITrip {
    origen: string;
    destino: string;
    leaving: string;
    arriving: string;
    Bus_placa: string;
}

export interface ITripModel extends ITrip, Document {}



const TripSchema: Schema = new Schema(
    {
        origen: { type: String},
        destino: { type: String},
        leaving: { type: String},
        arriving: { type: String},
        Bus_placa: { type: String},
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<ITripModel>('Trip', TripSchema);
