import mongoose from "mongoose";
import { Schema } from "mongoose";

const rouletterSchema = new Schema(
    {
        rouletteNumbers: {
        type: [Number],
        enum: [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
        ],
        required: true,
        },
        rouletteColors: {
        type: [String],
        enum: ["Red", "Black"],
        required: true,
        },
        winnerNumer: {
            type: Number,
            required: false
        },
        winnerColor: {
            type: String,
            required: false
        },
        winnerUserNumberId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userId',
            required: false
        },
        winnerUserColorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userId',
            required: false
        }
    },
    {
        timestamps: true
    }
);

export const rouletteModel = mongoose.model('roulettes', rouletterSchema);