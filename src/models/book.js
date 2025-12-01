import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    description: {
        type: String
    },
    ISBN: {
        type: String,
        required: true,
        unique: true
    },
    pagesCount: {
        type: Number,
        required: true,
    },
    shippingWeight: {
        type: Number
    },
    dimensions: {
        type: String
    },
    listPrice: {
        type: Number,
        required: true
    },
    listPriceCurrency: {
        type: String,
        required: true,
        default: 'Rs.'
    },
    ourPrice: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    ourPriceAfterDiscount: {
        type: Number,
        default: 0
    },
    youSave: {
        type: Number,
        default: 0
    },
    format: {
        type: String,
        enum: ['Audio Book', 'Board Book', 'Flexi Bind', 'Hard Cover', 'Paperback'],
        required: true
    },
    publicationYear: {
        type: Number,
        required: true
    },
    publisher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publisher',
        required: true
    },
    authors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    }],
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }],
    subCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: []
    }],
    additionalCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: []
    }],
    status: {
        type: String,
        enum: ['In Stock', 'Pre-Order', 'Out of Stock'],
        required: true
    },
    statusMessage: {
        type: String,
    },
    language: {
        type: String,
        required: true
    },
    inStock: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

BookSchema.pre('save', function (next) {
    this.youSave = this.ourPrice * (this.discount / 100);
    this.ourPriceAfterDiscount = this.ourPrice - this.youSave;
    if (this.inStock == 0) {
        this.status = 'Out of Stock'
    }
    next();
});

// Single-field indexes for filters
BookSchema.index({ authors: 1 });
BookSchema.index({ categories: 1 });
BookSchema.index({ publisher: 1 });
BookSchema.index({ yearPublished: 1 });
BookSchema.index({ language: 1 });
BookSchema.index({ format: 1 });
BookSchema.index({ ourPriceAfterDiscount: 1 });


const BookModel = mongoose.model('Book', BookSchema);

export default BookModel;