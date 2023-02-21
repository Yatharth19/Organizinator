const express = require('express');
const router = express.Router();
const thoughtsController = require('../controllers/thoughts')

router.get('/', thoughtsController.getAllThoughts);
router.post('/', thoughtsController.addThought);
router.get('/edit', thoughtsController.getThought);
router.post('/edit', thoughtsController.updateThought)

module.exports = router;