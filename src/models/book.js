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
        default: 'Rs'
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
    yearPublished: {
        type: Number,
        required: true
    },
    publisherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publisher',
        required: true
    },
    authorIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    }],
    categoryIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }],
    subCategoryIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: []
    }],
    additionalCategoryIds: [{
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
    }
}, {timestamps: true})

BookSchema.pre('save', function (next) {
    this.youSave = this.ourPrice * (this.discount / 100);
    this.ourPriceAfterDiscount = this.ourPrice - this.youSave;
    next();
});

// Text index for keyword search (title + description)
BookSchema.index(
  { title: "text", description: "text" },
  {
    name: "TextSearchIndex",
    weights: { title: 5, description: 1 }, // prioritize title matches
  }
);

// Single-field indexes for filters
BookSchema.index({ authorIds: 1 });
BookSchema.index({ categoryIds: 1 });
BookSchema.index({ publisherId: 1 });
BookSchema.index({ yearPublished: 1 });
BookSchema.index({ language: 1 });
BookSchema.index({ format: 1 });
BookSchema.index({ ourPriceAfterDiscount: 1 });


const BookModel = mongoose.model('Book', BookSchema);

export default BookModel;