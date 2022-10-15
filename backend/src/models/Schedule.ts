import mongoose, { Document, Schema } from 'mongoose';


export interface ISchedule {
    parking_alias: string;
    opening: string;
    closing: string;
    m: Boolean,
    t: Boolean,
    w: Boolean,
    th: Boolean,
    f: Boolean,
    st: Boolean,
    sn: Boolean,
    status: Boolean
}

export interface IScheduleModel extends ISchedule, Document { }



const ScheduleSchema: Schema = new Schema(
    {
        parking_alias: { type: String, required: true },
        opening:  { type: String, required: true },
        closing: { type: String, required: true },
        m: { type: Boolean, required: true },
        t: { type: Boolean, required: true },
        w: { type: Boolean, required: true },
        th: { type: Boolean, required: true },
        f: { type: Boolean, required: true },
        st: { type: Boolean, required: true },
        sn: { type: Boolean, required: true },
        status: { type: Boolean, default:true}
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IScheduleModel>('Schedule', ScheduleSchema);
