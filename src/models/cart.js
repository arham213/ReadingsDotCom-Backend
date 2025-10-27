import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: true
    },
    itemCount: {
        type: Number,
        required: true,
        default: 0
    },
    totalQuantity: {
        type: Number,
        required: true,
        default: 0
    },
    subTotal: {
        type: Number,
        required: true,
        default: 0
    },
    cartItems: [{
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
        },
        quantity: {
            type: Number,
        },
        totalPrice: {
            type: Number,
        }
    }]
}, {timestamps: true})

CartSchema.pre('save', function (next) {
    const bookIds = this.cartItems.map(item => item.bookId.toString());
    
    if (new Set(bookIds).size !== bookIds.length) {
        return next(new Error('Duplicate book in cartItems'));
    }

    let totalQuantity = 0;
    let subTotal = 0;

    this.cartItems.forEach(item => {
        totalQuantity += item.quantity;
        subTotal += item.totalPrice;
    });

    this.itemCount = this.cartItems.length;
    this.totalQuantity = totalQuantity;
    this.subTotal = subTotal;

    next();
});

const CartModel = mongoose.model('Cart', CartSchema);

export default CartModel;