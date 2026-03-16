const express = require('express');
const router = express.Router();
const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require('../controllers/post.controller');
const validate = require('../middleware/validate');
const postSchema = require('../schemas/post.schema');
const auth = require('../middleware/auth');

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', auth, validate(postSchema), createPost);
router.put('/:id', auth, validate(postSchema), updatePost);
router.delete('/:id', auth, deletePost);

module.exports = router;
