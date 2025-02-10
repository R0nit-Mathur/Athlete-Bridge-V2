import mongoose, {Schema, model, models} from "mongoose";


export interface Ifund{
    _id?: mongoose.Types.ObjectId;
    user: string;
    username: string;
    title: string;
    description: string;
    Amount: Number;
    Amntrcvd?: Number;
    createdAt?: Date;
    updatedAt?: Date;
}

const fundSchema = new Schema<Ifund>({
    user: {type: String, required: true},
    username: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    Amount: {type: Number, required: true},
    Amntrcvd: {type: Number, required: true},
}, {timestamps: true})

const Funds = models?.Funds || model<Ifund>("Fund", fundSchema);

export default Funds;