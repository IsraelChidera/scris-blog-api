const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, getCurrentUser } = require('../controllers/user.controller');
const validate = require('../middleware/validate');
const userSchema = require('../schemas/user.schema');
const auth = require('../middleware/auth');

router.get('/', getAllUsers);
router.post('/', validate(userSchema), createUser);
router.get("/me", auth, getCurrentUser);

module.exports = router;
