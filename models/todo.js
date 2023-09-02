import mongoose from "mongoose";


const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String
    },
    desc: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

export const Todos = mongoose.model("Todos", schema);
