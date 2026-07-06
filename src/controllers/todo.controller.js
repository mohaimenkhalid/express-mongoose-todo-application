const mongoose = require("mongoose");
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

exports.getTodoById = async (req, res, next) => {
        try {
                const { id } = req.params;
                const todo = await Todo.findById(id).select({
                        __v: 0
                });
                if (!todo) {
                        return res.status(404).json({
                                success: false,
                                message: "Todo not found",
                        });
                }
                return res.status(200).json({
                        success: true,
                        data: todo,
                });
        } catch (error) {
                next(error)
        }
}

exports.updateTodoById = async (req, res, next) => {
        try {
                if (!req.body || Object.keys(req.body).length === 0) {
                        return res.status(400).json({
                                success: false,
                                message: "Request body cannot be empty",
                        });
                }
                const {id} = req.params;

                if (req.body.title) {
                        req.body.slug = generateSlug(req.body.title);
                }

                const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
                        new: true,
                        runValidators: true
                })
                console.log(updatedTodo)
                if (!updatedTodo) {
                        return res.status(404).json({
                                success: false,
                                message: "Todo not found",
                        });
                }

                return res.status(200).json({
                        success: true,
                        message: "Todo updated successfully",
                        data: updatedTodo,
                });
        } catch (error) {
                next(error)
        }
}

exports.deleteTodoById = async (req, res, next) => {
        try {
                const {id} = req.params;
                const deleteTodo = await Todo.findOneAndDelete(id)
                if (!deleteTodo) {
                        return res.status(404).json({
                                success: false,
                                message: "Todo not found",
                        });
                }

                return res.status(200).json({
                        success: true,
                        message: "Todo deleted successfully",
                });
        } catch (error) {
                next(error)
        }
}

exports.deleteMultipleTodos = async (req, res, next) => {
        try {
                const { ids } = req.body;

                if(!Array.isArray(ids) || !ids.length) {
                        return res.status(400).json({
                                success: false,
                                message: 'Please provide the id of the todos array',
                        })
                }

                //Check id valid or not
                const hasInvalidId = ids.some(
                    (id) => !mongoose.Types.ObjectId.isValid(id)
                );

                if (hasInvalidId) {
                        return res.status(400).json({
                                success: false,
                                message: "One or more IDs are invalid.",
                        });
                }

                const result = await Todo.deleteMany({
                        _id: { $in: ids },
                });
                console.log(result)
                return res.status(200).json({
                        success: true,
                        message: `${result.deletedCount} todo(s) deleted successfully.`,
                })
        } catch (error) {
                next(error)
        }
}


