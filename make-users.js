const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, default: 'customer' }
});

const User = mongoose.model('User', userSchema);

async function run() {
  try {
    await mongoose.connect('mongodb+srv://emmanuelu108_db_user:O08187657382e@cluster0.czpl6ks.mongodb.net/worknoon-chat');
    console.log('Connected to MongoDB!');
    
    // Create users
    await User.create({ username: 'sarah', email: 'sarah@test.com', password: await bcrypt.hash('123456', 10) });
    await User.create({ username: 'john', email: 'john@test.com', password: await bcrypt.hash('123456', 10) });
    await User.create({ username: 'admin', email: 'admin@test.com', password: await bcrypt.hash('123456', 10), role: 'admin' });
    
    console.log('✅ Users created successfully!');
    console.log('You can now login with:');
    console.log('  sarah@test.com / 123456');
    console.log('  john@test.com / 123456');
    console.log('  admin@test.com / 123456');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

run();