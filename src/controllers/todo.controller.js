const Todo = require('../models/todo.model')
const generateSlug = require('../utils/slugify')

exports.getTodos = async (req, res, next) => {
        try {
                const todos = await Todo.find().select({
                        __v: 0
                });
                //.select("-__v") shorthand
                return res.status(200).json({
                        success: true,
                        message: "Todos fetched successfully",
                        data: todos,
                });
        } catch (error) {
                next(error)
        }
}

exports.createTodos = async (req, res, next) => {
        try {
                const newTodo = new Todo(req.body);
                newTodo.slug = generateSlug(newTodo.title)
                const savedTodo = await newTodo.save();
                return res.status(201).json({
                        success: true,
                        message: "Todo created successfully",
                        data: savedTodo,
                });
        } catch (error) {
                next(error)
        }
}

exports.getTodoById = async (req, res) => {
        res.status(200).json([{name: 'khalid'}])
}

exports.updateTodoById = async (req, res) => {
        res.status(200).json([{name: 'khalid'}])
}

exports.deleteTodoById = async (req, res) => {
        res.status(200).json([{name: 'khalid'}])
}


