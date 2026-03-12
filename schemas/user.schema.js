const Joi = require('joi');

const userSchema = Joi.object({
    email: Joi.string().min(5).required(),
    password: Joi.string().min(6).required()
});
// const userSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         minlength: 5,
//         maxlength: 255,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: 6,
//         maxlength: 1024
//     },
// });

module.exports = userSchema;