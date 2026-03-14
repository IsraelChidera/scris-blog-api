const bcrypt = require('bcrypt');
const _ = require('lodash');
const User = require('../models/user.model');
const authSchema = require('../schemas/auth.schema');

const loginUser = async (req, res) => {
    try {
        const { error } = authSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ error: 'Invalid email or password' });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'Invalid email or password' });

        const token = user.generateAuthToken();

        res.json({ user: _.pick(user, ['_id', 'name', 'email']), token });

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { loginUser };
