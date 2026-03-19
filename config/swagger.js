const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Scris Blog API',
            version: '1.0.0',
            description: 'REST API for the Scris Blog platform',
        },
        servers: [
            {
                url: 'https://scris-blog-api.onrender.com',
                description: 'Production server',
            },
            {
                url: 'http://localhost:3000',
                description: 'Local development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                Post: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', example: '64a1b2c3d4e5f6a7b8c9d0e1' },
                        title: { type: 'string', example: 'My First Post' },
                        slug: { type: 'string', example: 'my-first-post' },
                        content: { type: 'string', example: 'This is the post content...' },
                        tags: { type: 'array', items: { type: 'string' }, example: ['tech', 'coding'] },
                        category: { type: 'string', example: 'Technology' },
                        publishedAt: { type: 'string', format: 'date-time' },
                        seoTitle: { type: 'string', example: 'My First Post | Scris Blog' },
                        seoDescription: { type: 'string', example: 'A brief description for SEO purposes.' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    },
                },
                PostInput: {
                    type: 'object',
                    required: ['title', 'slug', 'content'],
                    properties: {
                        title: { type: 'string', example: 'My First Post' },
                        slug: { type: 'string', example: 'my-first-post' },
                        content: { type: 'string', example: 'This is the post content...' },
                        tags: { type: 'array', items: { type: 'string' }, example: ['tech', 'coding'] },
                        category: { type: 'string', example: 'Technology' },
                        seoTitle: { type: 'string', example: 'My First Post | Scris Blog' },
                        seoDescription: { type: 'string', example: 'A brief description for SEO purposes.' },
                    },
                },
                User: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', example: '64a1b2c3d4e5f6a7b8c9d0e1' },
                        name: { type: 'string', example: 'John Doe' },
                        email: { type: 'string', example: 'john@example.com' },
                    },
                },
                UserInput: {
                    type: 'object',
                    required: ['name', 'email', 'password'],
                    properties: {
                        name: { type: 'string', example: 'John Doe' },
                        email: { type: 'string', example: 'john@example.com' },
                        password: { type: 'string', example: 'Secret@123' },
                    },
                },
                AuthInput: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: { type: 'string', example: 'admin@admin.com' },
                        password: { type: 'string', example: 'Admin@scris' },
                    },
                },
                AuthResponse: {
                    type: 'object',
                    properties: {
                        token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                    },
                },
                Error: {
                    type: 'object',
                    properties: {
                        error: { type: 'string', example: 'Error message here' },
                    },
                },
            },
        },
    },
    apis: ['./routes/*.js'],
};

module.exports = swaggerJsdoc(options);
