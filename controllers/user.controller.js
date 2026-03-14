const _ = require('lodash');
const User = require('../models/user.model');
const { hashPassword } = require('../config/hash');
const userSchema = require('../schemas/user.schema');

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
        const { error } = userSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) return res.status(400).json({ error: 'Email already exists' });

        const user = new User(_.pick(req.body, ['name', 'email', 'password']));
        user.password = await hashPassword(user.password);
        await user.save();

        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));

        return res.json({ user: _.pick(user, ['_id', 'name', 'email']), token })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = { getAllUsers, createUser, getCurrentUser };
