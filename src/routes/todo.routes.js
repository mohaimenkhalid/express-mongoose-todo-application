const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller')
const authGuard = require('../middlewares/authGuard.middleware')

router.route('/')
    .get(authGuard, todoController.getTodos)
    .post(authGuard, todoController.createTodos)
    .delete(authGuard, todoController.deleteMultipleTodos)

router.route('/:id')
    .get(authGuard, todoController.getTodoById)
    .patch(authGuard, todoController.updateTodoById)
    .delete(authGuard, todoController.deleteTodoById)


module.exports = router;