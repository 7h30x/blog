var express = require('express');
var router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const commentController = require('../controllers/comment');

// //comments
router.post('/', verifyToken, commentController.create )
router.delete('/:id', verifyToken, commentController.delete)
module.exports = router;
