const todoService = require('../services/todo.service');

exports.getTodos = async (req, res, next) => {
    try {
        const todos = await todoService.getTodos();
        return res.status(200).json({
            success: true,
            message: 'Todos fetched successfully',
            data: todos,
        });
    } catch (error) {
        next(error);
    }
};

exports.createTodos = async (req, res, next) => {
    try {
        const savedTodo = await todoService.createTodos(req.body, req.user.userId);
        return res.status(201).json({
            success: true,
            message: 'Todo created successfully',
            data: savedTodo,
        });
    } catch (error) {
        next(error);
    }
};

exports.getTodoById = async (req, res, next) => {
    try {
        const todo = await todoService.getTodoById(req.params.id);
        return res.status(200).json({
            success: true,
            data: todo,
        });
    } catch (error) {
        next(error);
    }
};

exports.updateTodoById = async (req, res, next) => {
    try {
        const updatedTodo = await todoService.updateTodoById(req.params.id, req.body);
        return res.status(200).json({
            success: true,
            message: 'Todo updated successfully',
            data: updatedTodo,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteTodoById = async (req, res, next) => {
    try {
        await todoService.deleteTodoById(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'Todo deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteMultipleTodos = async (req, res, next) => {
    try {
        const result = await todoService.deleteMultipleTodos(req.body.ids);
        return res.status(200).json({
            success: true,
            message: `${result.deletedCount} todo(s) deleted successfully.`,
        });
    } catch (error) {
        next(error);
    }
};


