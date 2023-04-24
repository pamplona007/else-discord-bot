import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Topic = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    server: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

export default mongoose.models.Topic || mongoose.model('Topic', Topic);
