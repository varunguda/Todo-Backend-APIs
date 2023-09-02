import express from 'express';
import { config } from 'dotenv';
import userRouter from './routes/users.js';
import cookieParser from 'cookie-parser';

config({
    path: "./config.env"
})

const app = express();

// Using Middleware
app.use(express.json());
app.use(cookieParser());

// creating api endpoints using routes
app.use('/api/v1/users', userRouter);

// Handling error
app.use((err, req, res, next)=>{
    return res.status(err.status).json({
        success: false,
        message: err.message
    })
})


export default app;