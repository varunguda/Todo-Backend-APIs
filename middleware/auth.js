import jwt from 'jsonwebtoken';
import { Users } from '../models/user.js';

export const isAuthenticated = async ( req, res, next ) =>{
    const { token } = req.cookies;

    if(!token){
        return res.status(401).json({
            success: false,
            message: "Login First!"
        })
    }

    const userPayload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Users.findById
    (userPayload.id);

    if(!user){
        return res.status(400).json({
            success: false,
            message: "Something went wrong, try logging in again!"
        })
    }

    req.user = user;
    next();
}