const User = require('../models/user.model');
const { hashPassword } = require('../config/hash');

const seedAdmin = async () => {
    const email = process.env.SEED_ADMIN_EMAIL;
    const password = process.env.SEED_ADMIN_PASSWORD;

    if (!email || !password) {
        console.warn('Seed skipped: SEED_ADMIN_EMAIL or SEED_ADMIN_PASSWORD not set in .env');
        return;
    }

    const existing = await User.findOne({ email });
    if (existing) {
        console.log('Admin already exists. Skipping seed.');
        return;
    }

    const hashed = await hashPassword(password);
    await User.create({ name: 'Admin', email, password: hashed });
    console.log(`Admin seeded: ${email}`);
};

module.exports = seedAdmin;
