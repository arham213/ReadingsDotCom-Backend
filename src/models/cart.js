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

//Pre-save middleware to validate and auto-calculate totals
CartSchema.pre('save', function (next) {

    //Validate for duplicate books
    const bookIds = this.cartItems.map(item => item.bookId.toString());
    if (new Set(bookIds).size !== bookIds.length) {
        return next(new Error('Duplicate book in cartItems'));
    }

    // Auto-calculate totals
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

//instance method to add items to the cart
CartSchema.methods.addItem = function (bookId, quantity, price) {

  const existing = this.cartItems.find(item => item.bookId.toString() === bookId.toString());

  if (existing) {
    existing.quantity += quantity;
    existing.totalPrice = existing.quantity * price;
  } else {
    this.cartItems.push({ bookId, quantity, totalPrice: quantity * price });
  }

  return this.save();
};

const CartModel = mongoose.model('Cart', CartSchema);

export default CartModel;