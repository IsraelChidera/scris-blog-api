const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send([{
        id: 1,
        title: 'First Post',
        content: 'This is the content of the first post.'
    }, {
        id: 2,
        title: 'Second Post',
        content: 'This is the content of the second post.'
    }]);
});

router.get('/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    console.log(`Fetching post with ID: ${postId}`);
    res.send("Post details for ID: " + postId);
});

router.post('/', (req, res) => {
    const { title, content } = req.body;
    console.log(`Creating post with title: ${title}`);
    res.status(201).send({ id: 3, title, content });
});

router.put('/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, content } = req.body;
    console.log(`Updating post with ID: ${postId}`);
    res.send({ id: postId, title, content });
});

router.delete('/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    console.log(`Deleting post with ID: ${postId}`);
    res.status(204).send();
});

module.exports = router;