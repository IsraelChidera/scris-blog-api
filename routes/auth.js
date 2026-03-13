const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const authSchema = require('../schemas/auth.schema');
const { loginUser } = require('../controllers/auth.controller');

router.post('/', validate(authSchema), loginUser);

module.exports = router;
