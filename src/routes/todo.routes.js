const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller')

router.route('/')
    .get(todoController.getTodos)
    .post(todoController.createTodos)
    .delete(todoController.deleteMultipleTodos)

router.route('/:id')
    .get(todoController.getTodoById)
    .patch(todoController.updateTodoById)
    .delete(todoController.deleteTodoById)


module.exports = router;