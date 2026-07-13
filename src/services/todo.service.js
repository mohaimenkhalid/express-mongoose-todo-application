const mongoose = require('mongoose');
const todoRepository = require('../repositories/todo.repository');
const generateSlug = require('../utils/slugify');

const createError = (message, statusCode = 400) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

exports.getTodos = async () => {
    return todoRepository.findAllTodos();
};

exports.createTodos = async (payload, userId) => {
    const todoPayload = {
        ...payload,
        slug: generateSlug(payload.title),
        createdBy: userId,
    };
    return todoRepository.createTodo(todoPayload);
};

exports.getTodoById = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw createError('Invalid mongo ID', 400);
    }

    const todo = await todoRepository.findTodoById(id);
    if (!todo) {
        throw createError('Todo not found', 404);
    }

    return todo;
};

exports.updateTodoById = async (id, payload) => {
    if (!payload || Object.keys(payload).length === 0) {
        throw createError('Request body cannot be empty', 400);
    }

    if (payload.title) {
        payload.slug = generateSlug(payload.title);
    }

    const updatedTodo = await todoRepository.updateTodoById(id, payload);
    if (!updatedTodo) {
        throw createError('Todo not found', 404);
    }

    return updatedTodo;
};

exports.deleteTodoById = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw createError('Invalid mongo ID', 400);
    }

    const deletedTodo = await todoRepository.deleteTodoById(id);
    if (!deletedTodo) {
        throw createError('Todo not found', 404);
    }

    return deletedTodo;
};

exports.deleteMultipleTodos = async (ids) => {
    if (!Array.isArray(ids) || ids.length === 0) {
        throw createError('Please provide the id of the todos array', 400);
    }

    const hasInvalidId = ids.some((id) => !mongoose.Types.ObjectId.isValid(id));
    if (hasInvalidId) {
        throw createError('One or more IDs are invalid.', 400);
    }

    return todoRepository.deleteManyTodos(ids);
};
