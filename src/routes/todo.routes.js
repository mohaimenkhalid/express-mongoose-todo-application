const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller')

router.route('/')
    .get(todoController.getTodos)
    .post(todoController.createTodos)

router.route('/:id')
    .get(todoController.getTodoById)
    .put(todoController.updateTodoById)
    .delete(todoController.deleteTodoById)


module.exports = router;