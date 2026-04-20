import mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    aboutInfo: {
        type: String
    }
}, {timestamps: true})

const AuthorModel = mongoose.model('Author', AuthorSchema);

export default AuthorModel;