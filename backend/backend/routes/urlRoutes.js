const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');
const authMiddleware = require('../middleware/authMiddleware');

// Public route
router.get('/:code', urlController.redirectUrl);

// Protected routes
router.post('/create', authMiddleware, urlController.createShortUrl);
router.get('/', authMiddleware, urlController.getUserUrls);
router.delete('/:id', authMiddleware, urlController.deleteUrl);

module.exports = router;
