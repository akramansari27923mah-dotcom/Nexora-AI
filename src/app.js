import express from 'express';
import authRouter from './routes/user.route.js'
import promptRouter from './routes/prompt.route.js'
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://nexora-ai-nine.vercel.app"
    ],
    credentials: true
}))

// prefix
app.use('/api/auth', authRouter)
app.use('/api/prompt', promptRouter)

// for test server is running or on 
app.get('/test', (_, res) => {
    res.send('serrver is running')
})

export default app