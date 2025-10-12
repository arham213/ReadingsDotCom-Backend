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
    }
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


const UserModel = mongoose.model('User', UserSchema);

export default UserModel;