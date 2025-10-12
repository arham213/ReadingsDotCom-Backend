import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: Number,
        required: true,
        unique: true
    }
}, {timestamps: true})

CategorySchema.index({ name: "text" });

const CategoryModel = mongoose.model('Category', CategorySchema);

export default CategoryModel;