const express = require('express')
const router = express.Router();
const roadmapController = require('../controllers/roadmap');

console.log(roadmapController);

router.get('/', roadmapController.getRoadMap);
router.post('/', roadmapController.postRoadMap);
// router.patch('/:id', roadmapController.editRoadMap);
// router.delete('/:id', roadmapController.deleteRoadMap);
router.get('/edit', roadmapController.getOneRoadMap);
router.post('/edit', roadmapController.updateRoadMap);

module.exports = router;