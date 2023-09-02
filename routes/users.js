import { Router } from "express";
import { createUser, deleteUser, getUser, loginUser, logoutUser, updateUser } from "../controllers/users.js";
import { isAuthenticated } from "../middleware/auth.js";
import { userDataValidation } from "../middleware/validation.js";

const router = Router();

router.post('/createuser', userDataValidation, createUser);

router.get('/login', userDataValidation ,loginUser)

router.get('/getuser', isAuthenticated, getUser);

router.put('/updateuser', isAuthenticated, userDataValidation, updateUser);

router.delete('/deleteuser', isAuthenticated, deleteUser);

router.get("/logout", isAuthenticated, logoutUser);


export default router;