require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const config = require('config');
const User = require('../models/user.model');
const { hashPassword } = require('../config/hash');

const email = process.env.SEED_ADMIN_EMAIL;
const password = process.env.SEED_ADMIN_PASSWORD;

if (!email || !password) {
    console.error('Missing SEED_ADMIN_EMAIL or SEED_ADMIN_PASSWORD in .env');
    process.exit(1);
}

const admin = { name: 'Admin', email, password };

async function seed() {
    await mongoose.connect(config.get('mongoURI'));
    console.log('Connected to MongoDB');

    const existing = await User.findOne({ email: admin.email });
    if (existing) {
        console.log('Admin user already exists. Skipping.');
        return;
    }

    const hashed = await hashPassword(admin.password);
    await User.create({ ...admin, password: hashed });
    console.log(`Admin seeded: ${admin.email}`);
}

seed()
    .catch(err => {
        console.error('Seed failed:', err.message);
        process.exit(1);
    })
    .finally(() => mongoose.disconnect());
