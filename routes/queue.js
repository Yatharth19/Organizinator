const express = require('express');
const queueController = require('../controllers/queue');
const router = express.Router();

// router.get(':id', queueController.deleteTask);
router.get('/', queueController.getAllTasks);    //display all the tasks
router.post('/', queueController.addTask);
router.get('/edit', queueController.getTask);
router.post('/edit', queueController.updateTask);

module.exports = router;