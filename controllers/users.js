import { Users } from "../models/user.js";
import { addCookieToken, hashPassword, isSamePass } from "../utils/user-functions.js";

export class ErrorHandler extends Error{
    constructor( message = "Internal Server Error!", status = 500 ){
        super(message),
        this.status = status
    }
}



export const createUser = async (req, res, next)=>{
    try {
        
        const { name, email, password } = req.body;
    
        const user = await Users.findOne({ email });
        if(user){
            return next(new ErrorHandler("This mail is already registered!", 400))
        }
    
        const hashedPass = await hashPassword(password);
    
        const newUser = await Users.create({
            name, email, password: hashedPass
        })
    
        if(!newUser){
            return next(new ErrorHandler())
        }
    
        addCookieToken(newUser, "Registered a user successfully!", 201, res);

    } catch (error) {
        return next(new ErrorHandler("An error occurred while processing your request!", 500 ))
    }
}



export const loginUser = async(req, res, next) => {
    try {
        const { email, password } = req.body;
    
        let user = await Users.findOne({ email }).select("+password");
        if(!user){
            return next(new ErrorHandler("Invalid Email or Password!", 400))
        }
    
        const isCorrectPass = await isSamePass(password, user.password)
    
        if(!isCorrectPass){
            return next(new ErrorHandler("Invalid Email or Password!", 400))
        }
    
        addCookieToken(user, "User Loggedin Successfully", 200, res);

    } catch (error) {
        return next(new ErrorHandler("An error occurred while processing your request!", 500 ))
    }
}



export const getUser = async(req, res, next)=>{
    return res.json({
        success: true,
        user: req.user
    });
}



export const deleteUser = async (req, res, next) =>{
    try {
        const user = await Users.findByIdAndDelete(req.user._id);
        if(!user){
            return next(new ErrorHandler("User not found!", 400));
        }
        return res.json({
            success: true,
            message: "User removed successfully!"
        })
    } catch (error) {
        return next(new ErrorHandler("An error occurred while processing your request!", 500 ))
    }
}



export const updateUser = async (req, res, next) =>{
    try {
        const { name , email, password } = req.body;
    
        if(req.user.email !== email){
            const user = await Users.findOne({ email });
            if(user){
                return next(new ErrorHandler("This email is already registered!", 400))
            }
        }
    
        await Users.findByIdAndUpdate(req.user._id, { name, email, password: await hashPassword(password) });
        return res.json({
            success: true,
            message: "User profile updated successfully!"
        })
    } catch (error) {
        return next(new ErrorHandler("An error occurred while processing your request!", 500 ))
    }
}



export const logoutUser = async (req, res, next) => {
    return res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "User Logged out successfully!"
    })
}