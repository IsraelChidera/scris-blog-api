const Post = require('../models/post.model');

const getAllPosts = async (req, res) => {
    try {
       
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.json(post);
    } catch (err) {
        if (err.name === 'CastError') return res.status(400).json({ error: 'Invalid post ID' });
        res.status(500).json({ error: 'Server error' });
    }
};

const createPost = async (req, res) => {
    try {
        const post = new Post(req.body);
        const result = await post.save();
        res.status(201).json(result);
    } catch (err) {
        if (err.code === 11000) return res.status(409).json({ error: 'Slug already exists' });
        res.status(500).json({ error: 'Server error' });
    }
};

const updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.json(post);
    } catch (err) {
        if (err.name === 'CastError') return res.status(400).json({ error: 'Invalid post ID' });
        if (err.code === 11000) return res.status(409).json({ error: 'Slug already exists' });
        res.status(500).json({ error: 'Server error' });
    }
};

const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.status(204).send();
    } catch (err) {
        if (err.name === 'CastError') return res.status(400).json({ error: 'Invalid post ID' });
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };
