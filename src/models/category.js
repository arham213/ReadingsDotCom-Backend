import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    code: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    }
}, {timestamps: true})

CategorySchema.index({ name: "text" });

const CategoryModel = mongoose.model('Category', CategorySchema);

export default CategoryModel;