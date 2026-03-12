const Joi = require('joi');
const userSchema = require('../schemas/user.schema');

function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(6).max(255).required()
    });

    // return Joi.valid(user, userSchema, { abortEarly: false }, (err, value) => {
    //     if (err) {
    //         const errors = err.details.map(detail => detail.message);
    //         return { error: errors };
    //     }
    //     return { value };
    // });
    return schema.validate(user);
}

module.exports = validateUser;