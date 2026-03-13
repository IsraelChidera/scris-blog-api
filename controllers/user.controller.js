const _ = require('lodash');
const User = require('../models/user.model');
const { hashPassword } = require('../config/hash');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const createUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) return res.status(400).json({ error: 'Email already exists' });

        const user = new User(_.pick(req.body, ['name', 'email', 'password']));
        user.password = await hashPassword(user.password);
        await user.save();

        res.status(201).json(_.pick(user, ['_id', 'name', 'email']));
    } catch (error) {
        if (error.code === 11000) return res.status(409).json({ error: 'Email already exists' });
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { getAllUsers, createUser };
