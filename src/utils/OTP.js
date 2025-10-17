import bcrypt from "bcrypt";

export const OTPGenerator = () => {
    const OTP = String(Math.floor(100000 + Math.random() * 900000));

    return OTP;
}

export const verifyOTP = async (sentOTP, storedOTP) => {
    const expiryTime = storedOTP.expiryTime;

    const currentTime = Date.now();
    console.log('currentTime:', currentTime, 'expiryTime:', expiryTime);

    if (currentTime > expiryTime.getTime()) {
        throw new Error("OTP is expired");
    }

    const isMatch = await bcrypt.compare(sentOTP, storedOTP.code)

    if (!isMatch) {
        throw new Error("Invalid OTP");
    }

    return true;
}