import jwt from 'jsonwebtoken'
import 'dotenv/config'
const middleware = async (req, res, next) => {

    const token = req.cookies?.token


    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id

        next()
    }
    catch (err) {
        console.log('error in middleware', err)
        res.status(401).json({
            success: false,
            message: 'Invalid token or expired'
        })
    }

}

export default middleware