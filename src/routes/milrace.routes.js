const express = require('express');
const router = express.Router();

const requireAuth = require('../middleware/requireAuth');
const milraceQuestionSetController = require('../controllers/milrace/milraceQuestionSet.controller.js');
const milraceGameHistoryController = require('../controllers/milrace/milraceGameHistory.controller.js');

// Milrace Question Set Routes
router.get('/milraceQuestion', milraceQuestionSetController.getAll); // Lấy tất cả
router.get('/milraceQuestion/:id', milraceQuestionSetController.getOne); // Lấy 1 bộ theo id
router.post('/milraceQuestion', requireAuth, milraceQuestionSetController.create); // Tạo mới
router.put('/milraceQuestion/:id', requireAuth, milraceQuestionSetController.update); // Cập nhật
router.delete('/milraceQuestion/:id', requireAuth, milraceQuestionSetController.delete); // Xóa

// Milrace Game History Routes
router.get('/milraceGameHistory', milraceGameHistoryController.getAll); // Lấy lịch sử
router.post('/milraceGameHistory', requireAuth, milraceGameHistoryController.create); // Tạo lịch sử mới

module.exports = router;
