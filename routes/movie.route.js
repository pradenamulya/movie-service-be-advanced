const express = require('express');
const router = express.Router();
const controller = require('../controllers/movie.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', authMiddleware.verifyToken, controller.getAll);
router.get('/:id', authMiddleware.verifyToken, controller.getById);
router.post('/', authMiddleware.verifyToken, controller.create);
router.patch('/:id', authMiddleware.verifyToken, controller.update);
router.delete('/:id', authMiddleware.verifyToken, controller.remove);

module.exports = router;
