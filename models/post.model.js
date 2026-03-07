const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3,
        maxlength: 255
    },
    content: {
        type: String,
        required: true,
        trim: true,
        minlength: 10
    },
    tags: {
        type: [String],
        default: []
    },
    category: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 255
    },
    publishedAt: {
        type: Date,
        default: Date.now
    },
    seoTitle: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 255
    },
    seoDescription: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 255
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
