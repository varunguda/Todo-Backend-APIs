import { Todos } from "../models/todo.js";
import { ErrorHandler } from "./users.js";


export const getMyTodos = async (req, res, next) => {
    
    const todos = await Todos.find({ user: req.user._id });

    return res.json({
        success: true,
        todos
    })
}



export const addTodo = async (req, res, next) => {
    
    const { title, desc } = req.body;

    await Todos.create({ title, desc, user: req.user._id,})

    return res.status(201).json({
        success: true,
        message: "Successfully created your todo!"
    })

}



export const deleteTodo = async (req, res, next) => {

    const { id } = req.params;

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
    
}



export const deleteAllTodos = async ( req, res, next ) => {
    
    await Todos.deleteMany({ user: req.user._id });

    // if(!removedTodos)
    
    return res.json({
        success: true,
        message: `Successfully deleted all the todos of ${ req.user.name }`
    })   
}



export const updateTodo = async ( req, res, next) => {
    const { id } = req.params;
    const { title, desc } = req.body;

    const todo = await Todos.findByIdAndUpdate(id, { title, desc });

    if(!todo){
        return next(new Error("Todo not found!", 400));
    }

    return res.json({
        success: true,
        message: "Todo updated successfully!"
    })
}



export const checkTodo = async (req, res, next) => {
    const { id } = req.params;

    const todo = await Todos.findById(id);

    if(!todo) return next(new ErrorHandler("Todo not found!", 400));

    todo.isCompleted = !todo.isCompleted;

    todo.save();

    return res.json({
        success: true,
        message: `Todo ${todo.isCompleted ? "Completed" : "Incomplete"}!` 
    })
}
