import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    password: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        match: /^[0-9]{10,15}$/
    },
    addresses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    }],
    wishlistItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }],
    role: {
        type: 'String',
        enum: ['user', 'admin'],
        required: true
    },
    isEmailVerified: {
        type: Boolean,
        reequired: true,
        default: false
    },
    OTP: {
        code: {
            type: String,
            required: true
        },
        expiryTime: {
            type: Date,
            default: () => new Date(Date.now() + 1 * 60 * 1000) // expires in 1 min
        }
    }
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);

  if (!this.isModified('OTP')) return next();
  this.OTP.code = await bcrypt.hash(this.OTP.code, 10);

  
  next();
});


const UserModel = mongoose.model('User', UserSchema);

export default UserModel;