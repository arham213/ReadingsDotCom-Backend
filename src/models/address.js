import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema ({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    country: {
        type: String
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zipCode: {
        type: String
    },
    contactNo: {
        type: String,
        match: /^[0-9]{10,15}$/,
        required: true
    }
})

const AddressModel = mongoose.model('Address', AddressSchema);

export default AddressModel;