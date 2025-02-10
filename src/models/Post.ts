import mongoose, {Schema, model, models} from "mongoose";


export interface Ipost{
    _id?: mongoose.Types.ObjectId;
    user: string;
    username: string;
    title: string;
    description: string;
    imageURL: string;
    likes?: Number;
    share?: Number;
    createdAt?: Date;
    updatedAt?: Date;
}

const postSchema = new Schema<Ipost>({
    user: {type: String, required: true},
    username: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    imageURL: {type: String, required: true},
    likes: {type:Number},
    share: {type:Number}
}, {timestamps: true})

const Post = models?.Post || model<Ipost>("Post", postSchema);

export default Post;