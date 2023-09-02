import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUser, loginUser, updateUser } from "../controllers/users.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = Router();

router.get('/all', getAllUsers);

router.post('/createuser', createUser);

router.get('/login', loginUser)

router.get('/getuser', isAuthenticated, getUser);

router.put('/updateuser', isAuthenticated, updateUser);

router.delete('/deleteuser', isAuthenticated, deleteUser);


export default router;