import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    deliveryAddressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    billingAddressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
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
    includeGiftWrap: {
        type: Boolean,
        default: false
    },
    includeInvoice: {
        type: Boolean,
        default: false
    },
    specialInstructions: {
        type: String
    },
    subTotal: {
        type: Number,
        required: true,
        default: 0
    },
    shippingCharges: {
        type: Number,
        required: true,
        default: 0
    },
    total: {
        type: Number,
        required: true,
        default: 0  
    },
    orderItems: [{
        bookId: {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'Book',
           required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        totalPrice: {
            type: Number,
            required: true
        }
    }]
}, {timestamps: true})

OrderSchema.pre('save', function(next) {
    this.total = this.subTotal + this.shippingCharges + (this.includeGiftWrap ? 100 : 0);
    next()
})

const OrderModel = mongoose.model('Order', OrderSchema);

export default OrderModel;