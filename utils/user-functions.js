import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const addCookieToken = (user, message, status, res) =>{
    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    return res
    .cookie("token",token, {
        httpOnly: true,
        expires: new Date(Date.now() + 30*60*100),
        sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
        secure: process.env.NODE_ENV === "DEVELOPMENT" ? "false" : "true",
    })
    .status(status)
    .json({
        success: true,
        message
    })
}


export const hashPassword = async (password) => {
    const hashedPass = await bcrypt.hash(password, 10)
    return hashedPass;
}

export const isSamePass = async (pass, hashpass) => {
    return await bcrypt.compare(pass, hashpass);
}

