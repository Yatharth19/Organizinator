const express = require('express');
const router = express.Router();
const sfController = require('../controllers/success-failures')

router.get('/', sfController.getAllSF);
router.post('/', sfController.addSF);
router.get('/edit', sfController.editSF);
router.get('/delete', sfController.deleteSF);

module.exports = router;