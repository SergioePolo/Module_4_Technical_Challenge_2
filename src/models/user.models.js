import mongoose, { mongo } from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: {
        type: String,
        required: true,
        },
        email: {
        type: String,
        required: false,
        },
        ammount: {
        type: String,
        required: true,
        },
    },
    {
        timestamps: true
    }
);

export const userModel = mongoose.model('user', userSchema);