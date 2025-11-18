import mongoose from "mongoose";
import { Schema } from "mongoose";

const rouletterSchema = new Schema(
    {
        status: {
        type: String,
        enum: ["open", "closed"],
        default: "closed",
        },
        winnerNumber: {
        type: Number,
        min: 0,
        max: 36,
        },
        winnerColor: {
        type: String,
        enum: ["red", "black"],
        },
        bets: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bet" }],
        default: [],
        },
    },
  { timestamps: true }
);

export const rouletteModel = mongoose.model("roulettes", rouletterSchema);
