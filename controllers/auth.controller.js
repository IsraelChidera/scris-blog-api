const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
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
        // const token = jwt.sign({ _id: user._id, email: user.email }, config.get('jwtSecret'), { expiresIn: '1h' });

        res.json({ token });

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { loginUser };
