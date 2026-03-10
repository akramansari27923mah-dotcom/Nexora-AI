import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import 'dotenv/config'
const JWT_SECRET = process.env.JWT_SECRET


// for hash password
export const hasePassword = (password) => {
    const hasedPassword = bcrypt.hash(password, 10);
    return hasedPassword;
}

export const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
}

export const generateToken = (userId) => {
    return jwt.sign({ id: userId }, JWT_SECRET)
}
