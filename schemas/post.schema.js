const Joi = require('joi');

const blogSchema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    slug: Joi.string().min(3).max(255).required(),
    content: Joi.string().min(10).required(),
    tags: Joi.array().items(Joi.string()),
    category: Joi.string().trim(),
    seoTitle: Joi.string().trim(),
    seoDescription: Joi.string().trim()
});

module.exports = blogSchema;