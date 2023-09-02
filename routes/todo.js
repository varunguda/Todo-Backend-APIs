import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { addTodo, checkTodo, deleteAllTodos, deleteTodo, getMyTodos, updateTodo } from "../controllers/todos.js";

const router = Router();

router.get('/mytodos', isAuthenticated, getMyTodos)

router.post('/addtodo', isAuthenticated, addTodo)

router.delete('/deletetodo/:id', isAuthenticated, deleteTodo)

router.delete("/deletealltodos", isAuthenticated, deleteAllTodos);

router.put("/updatetodo/:id", isAuthenticated, updateTodo )

router.put("/checktodo/:id", isAuthenticated, checkTodo )

export default router