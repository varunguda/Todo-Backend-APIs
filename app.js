import express from 'express';
import { config } from 'dotenv';
import userRouter from './routes/users.js';
import todoRouter from './routes/todo.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
config({
    path: "./config.env"
})

const app = express();


// Using Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: [ "GET", "POST", "PUT", "DELETE" ],
    credentials: true
}))


// creating api endpoints using routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/todos',todoRouter);


// Handling error
app.use((err, req, res, next)=>{
    return res.status(err.status).json({
        success: false,
        message: err.message
    })
})


export default app;