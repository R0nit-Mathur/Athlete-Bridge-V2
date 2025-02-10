import mongoose, {Schema, model, models} from "mongoose";

export const VIDEO_DIMENSION = {
    width: 1080,
    height: 1920,
} as const

export interface Ivideo{
    _id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
    videoURL: string;
    thumbnailURL: string;
    controls?: boolean;
    tranformation?: {
        height: Number;
        width: Number;
        quality?: Number;
    }
    likes?: Number;
    share?: Number;
    createdAt?: Date;
    updatedAt?: Date;
}

const videoSchema = new Schema<Ivideo>({
    title: {type: String, required: true},
    description: {type: String, required: true},
    videoURL: {type: String, required: true},
    thumbnailURL: {type: String},
    controls: {type: Boolean, default: true},
    tranformation: {
        height: {type: Number, default: VIDEO_DIMENSION.height},
        width: {type: Number, default: VIDEO_DIMENSION.width},
        quality: {type: Number, min: 1, max: 100}
    },
    likes: {type:Number, default: 0},
    share: {type:Number, default: 0}
}, {timestamps: true})

const Video = models?.Video || model<Ivideo>("Video", videoSchema);

export default Video;