const express = require('express');
const router = express.Router();
const { getAllUsers, createUser } = require('../controllers/user.controller');
const validate = require('../middleware/validate');
const userSchema = require('../schemas/user.schema');

router.get('/', getAllUsers);
router.post('/', validate(userSchema), createUser);

module.exports = router;
