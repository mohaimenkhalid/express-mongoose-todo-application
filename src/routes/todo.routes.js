const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller')

//post multiple todos
router.post('/all', todoController.getAllTodos)


router.route('/')
    .get(todoController.getTodos)
    .post(todoController.createTodo)

router.route('/:id')
    .get(todoController.getTodoById)
    .put(todoController.updateTodoById)
    .delete(todoController.deleteTodoById)

module.exports = router;