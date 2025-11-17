import mongoose from "mongoose";
import { Schema } from "mongoose";

const betSchema =  new Schema({
    rouletteId: mongoose.Schema.Types.ObjectId,
    ref: 'roulette',
    required: true
    },
    {
    timestamps: true
})

export const betModel = mongoose.model('bets', betSchema);