const express = require('express');
const router = express.Router();
const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require('../controllers/post.controller');
const validate = require('../middleware/validate');
const postSchema = require('../schemas/post.schema');

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', validate(postSchema), createPost);
router.put('/:id', validate(postSchema), updatePost);
router.delete('/:id', deletePost);

module.exports = router;
