const Todo = require('../models/todo.model');

const findAllTodos = async () => {
    return Todo.find()
        .populate({ path: 'createdBy', select: '-__v -status' })
        .select('-__v');
};

const createTodo = async (payload) => {
    const todo = new Todo(payload);
    return todo.save();
};

const findTodoById = async (id) => {
    return Todo.findById(id).select('-__v');
};

const updateTodoById = async (id, payload) => {
    return Todo.findByIdAndUpdate(id, payload, {
        returnDocument: 'after',
        runValidators: true,
    });
};

const deleteTodoById = async (id) => {
    return Todo.findByIdAndDelete(id);
};

const deleteManyTodos = async (ids) => {
    return Todo.deleteMany({ _id: { $in: ids } });
};

module.exports = {
    findAllTodos,
    createTodo,
    findTodoById,
    updateTodoById,
    deleteTodoById,
    deleteManyTodos,
};
