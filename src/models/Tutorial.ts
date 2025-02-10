import mongoose, {Schema, model, models} from "mongoose";


export interface Itutor{
    _id?: mongoose.Types.ObjectId;
    user: string;
    username: string;
    title: string;
    description: string;
    videoURL: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const tutorSchema = new Schema<Itutor>({
    user: {type: String, required: true},
    username: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    videoURL: {type: String, required: true},
}, {timestamps: true})

const Tutor = models?.Tutor || model<Itutor>("Tutor", tutorSchema);

export default Tutor;