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
        required: true,
        default: false
    },
    OTP: {
        code: {
            type: String
        },
        expiryTime: {
            type: Date
        }
    },
    lastOTPSentAt: {
        type: Date,
        default: null
    },
    resetPasswordOTP: {
        code: {
            type: String,
        },
        expiryTime: {
            type: Date
        }
    },
    lastResetPasswordOTPSentAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    try {
        // Hash password if modified
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 10);
        }

        // Hash OTP if modified
        if (this.isModified('OTP.code')) {
            this.OTP.code = await bcrypt.hash(this.OTP.code, 10);
        }

        // Hash resetPassword OTP
        if (this.isModified('resetPasswordOTP.code')) {
            this.resetPasswordOTP.code = await bcrypt.hash(this.resetPasswordOTP.code, 10);
        }

        next();
    } catch (error) {
        next(new Error("Failed to process user data. Please try again."))
    }
});


const UserModel = mongoose.model('User', UserSchema);

export default UserModel;