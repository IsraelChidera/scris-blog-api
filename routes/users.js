const express = require('express');
const router = express.Router();
const { getAllUsers, createUser } = require('../controllers/user.controller');
const validateUser = require('../middleware/validateUser');
const userSchema = require('../schemas/user.schema');

router.get('/', getAllUsers);
router.post('/', validateUser(userSchema), createUser);

module.exports = router;