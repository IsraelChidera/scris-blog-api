const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
});

function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(6).max(255).required()
    });

    return Joi.validate(user, schema, { abortEarly: false }, (err, value) => {        if (err) {
            const errors = err.details.map(detail => detail.message);
            return { error: errors };
        }
        return { value };
    });
    // return schema.validate(user);
}

module.exports.validateUser = validateUser;
module.exports = mongoose.model('User', userSchema);