import { Router } from "express";
import { createUser, deleteUser, getUser, loginUser, logoutUser, updateUser } from "../controllers/users.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = Router();

router.post('/createuser', createUser);

router.get('/login', loginUser)

router.get('/getuser', isAuthenticated, getUser);

router.put('/updateuser', isAuthenticated, updateUser);

router.delete('/deleteuser', isAuthenticated, deleteUser);

router.get("/logout", isAuthenticated, logoutUser);


export default router;