import mongoose from "mongoose";
import { Schema } from "mongoose";

const betSchema = new Schema(
    {
        rouletteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "roulettes",
        required: true,
        },
        type: {
            type: String,
            enum: ['number', 'color'],
            required: true
        },
        number:{
            type: Number,
            min: 0,
            max: 36,
        },
        color: {
            type: String,
            enum:['red', 'black']
        }, 
        amount: {
            type: Number,
            min: 1,
            max: 10000,
            required: true
        },
        won: {
            type: Boolean,
            default: null
        },
        winnings:{
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
    }
);

export const betModel = mongoose.model("bets", betSchema);
