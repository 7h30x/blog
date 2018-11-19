var express = require('express');
var router = express.Router();
const articleController = require('../controllers/article');
const verifyToken = require('../middleware/verifyToken');

//articles
router.post('/', verifyToken, verifyToken, articleController.create )
router.get('/', articleController.getAll )
router.get('/:id', articleController.getOne )
router.post('/:id', verifyToken, articleController.update)
router.delete('/:id', verifyToken, articleController.delete)

module.exports = router;
