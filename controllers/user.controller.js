const User = require('../models/user.model');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createUser = async (req, res) => {
    try {
        // const user = new User(req.body);
        const user = new User({
            email: req.body.email,
            password: req.body.password
        })
        const result = await user.save();

        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAllUsers,
    createUser
};