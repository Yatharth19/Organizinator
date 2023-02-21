const express = require('express');
const todoController = require('../controllers/todo');
const router = express.Router();

// router.get(':id', todoController.deleteTask);
router.get('/', todoController.getAllTasks);    //display all the tasks
router.post('/', todoController.addTask);
router.get('/edit', todoController.getTask);
router.post('/edit', todoController.updateTask);

module.exports = router;