import userModel from "../models/user.model.js";
import { cookieOptions, generateToken, hasePassword } from "../lib/utils.js";
import bcrypt from "bcryptjs";


const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(401).json({
            success: false,
            message: "All feilds are required"
        })
    }

    const isUser = await userModel.findOne({ email })

    if (isUser) {
        return res.status(400).json({
            success: false,
            message: 'User already axist'
        })
    }

    try {
        const hasedPassword = await hasePassword(password)

        const newUser = await userModel.create({
            username,
            email,
            password: hasedPassword
        })

        const token = generateToken(newUser._id)

        res.cookie('token', token, cookieOptions)

        res.status(201).json({
            success: true,
            message: 'User registerd successfully',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        })

    }
    catch (err) {
        console.log(err);

        res.status(500).json({
            success: false,
            message: 'User register faileds'
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(401).json({
            success: false,
            message: 'All feilds are required'
        })
    }

    try {
        const isUser = await userModel.findOne({ email })

        if (!isUser) {
            return res.status(403).json({
                success: false,
                message: 'Invalid credentials'
            })
        }
        const isPassword = await bcrypt.compare(password, isUser.password)

        if (!isPassword) {
            res.status(403).json({
                success: false,
                message: 'Invalid credentials'
            })
        }

        const token = generateToken(isUser._id)
        
        res.cookie('token', token, cookieOptions)

        res.status(200).json({
            success: true,
            message: 'User loggedIn successfully',
            user: {
                id: isUser._id,
                username: isUser.username,
                email: isUser.email
            }
        })
    }
    catch (err) {
        console.log('error', err);
        res.status(500).json({
            success: false,
            message: 'Error in login'
        })
    }
}

const logout = async (req, res) => {
    const token = req.cookies?.token

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        })
    }

    try {
        res.clearCookie('token')
        res.status(200).json({
            success: true,
            message: 'User Logout successfully'
        })
    }
    catch (err) {
        console.log('error', err);
        res.status(500).json({
            success: false,
            message: 'Interval server error'
        })
    }
}

const getUser = async (req, res) => {
    const userId = req.userId;

    try {
        const user = await userModel.findById(userId).select('-password')

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        res.status(200).json({
            success: true,
            message: 'User fecthed successfully',
            user: {
                username: user.username,
                id: user.id,
                email: user.email
            }
        })
    }
    catch (err) {
        console.log('error in getuser', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export default { register, login, logout, getUser }