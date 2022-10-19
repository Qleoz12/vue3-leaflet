import { boolean } from 'joi';
import mongoose, { Document, Schema } from 'mongoose';


export interface ITrip {
    origen: string;
    destino: string;
    leaving: string;
    arriving: string;
    bus_placa: string;
    complete: Boolean;
}

export interface ITripModel extends ITrip, Document {}



const TripSchema: Schema = new Schema(
    {
        origen: { type: String},
        destino: { type: String},
        leaving: { type: String},
        arriving: { type: String},
        bus_placa: { type: String},
        status: {type: Boolean},
        complete: {type: Boolean},
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<ITripModel>('Trip', TripSchema);
