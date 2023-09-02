import { Todos } from "../models/todo.js";
import { ErrorHandler } from "./users.js";


export const getMyTodos = async (req, res, next) => {
    try {
        const todos = await Todos.find({ user: req.user._id });
    
        return res.json({
            success: true,
            todos
        })
    } catch (error) {
        return next(new ErrorHandler("An error occurred while processing your request!", 500 ))
    }
}



export const addTodo = async (req, res, next) => {
    try {
        const { title, desc } = req.body;
    
        await Todos.create({ title, desc, user: req.user._id,})
    
        return res.status(201).json({
            success: true,
            message: "Successfully created your todo!"
        })
    } catch (error) {
        return next(new ErrorHandler("An error occurred while processing your request!", 500 ))
    }
}



export const deleteTodo = async (req, res, next) => {
    try {

        const { id } = req.params;

        if(!id){
            return next(new ErrorHandler("Missing parameters 'id', Please try again!", 400));
        }
    
        let todo = await Todos.findById(id);
        if(!todo){
            return next(new ErrorHandler("Todo not found!", 400));
        }
        
        if(todo.user.toString() !== req.user._id.toString()){
            return next(new ErrorHandler("You are not allowed to perform this action!", 403 ))
        }
    
        await Todos.deleteOne({_id: todo._id});
    
        return res.json({
            success: true,
            message: "Todo removed successfully!"
        })

    } catch (error) {
        return next(new ErrorHandler("An error occurred while processing your request!", 500 ))
    }    
}



export const deleteAllTodos = async ( req, res, next ) => {
    try {
        
        await Todos.deleteMany({ user: req.user._id });
        
        return res.json({
            success: true,
            message: `Successfully deleted all the todos of ${ req.user.name }`
        })   

    } catch (error) {
        return next(new ErrorHandler("An error occurred while processing your request!", 500 ))
    }
}



export const updateTodo = async ( req, res, next) => {
    try {
    
        const { id } = req.params;
        const { title, desc } = req.body;

        if(!id){
            return next(new ErrorHandler("Missing parameters 'id', Please try again!", 400));
        }
    
        const todo = await Todos.findByIdAndUpdate(id, { title, desc });
    
        if(!todo){
            return next(new Error("Todo not found!", 400));
        }
    
        return res.json({
            success: true,
            message: "Todo updated successfully!"
        })
    } catch (error) {
        return next(new ErrorHandler("An error occurred while processing your request!", 500 ))
    }
}



export const checkTodo = async (req, res, next) => {
    try {
        const { id } = req.params;

        if(!id){
            return next(new ErrorHandler("Missing parameters 'id', Please try again!", 400));
        }
    
        const todo = await Todos.findById(id);
    
        if(!todo) return next(new ErrorHandler("Todo not found!", 400));
    
        todo.isCompleted = !todo.isCompleted;
    
        todo.save();
    
        return res.json({
            success: true,
            message: `Todo ${todo.isCompleted ? "Completed" : "Incomplete"}!` 
        })
    } catch (error) {
        return next(new ErrorHandler("An error occurred while processing your request!", 500 ))        
    }
}
