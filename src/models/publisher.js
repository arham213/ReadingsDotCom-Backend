import mongoose from "mongoose";

const PublisherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true})

const PublisherModel = mongoose.model('Publisher', PublisherSchema);

export default PublisherModel;