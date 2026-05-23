const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, default: 'customer' }
});

const User = mongoose.model('User', userSchema);

async function createUsers() {
  try {
    await mongoose.connect('mongodb+srv://emmanuelu108_db_user:O08187657382e@cluster0.czpl6ks.mongodb.net/worknoon-chat');
    
    console.log('Connected to MongoDB');
    
    // Delete existing users (optional)
    await User.deleteMany({});
    
    // Create users
    const users = await User.create([
      { username: 'agu', email: 'agu@test.com', password: await bcrypt.hash('123456', 10) },
      { username: 'sarah', email: 'sarah@test.com', password: await bcrypt.hash('123456', 10) },
      { username: 'admin', email: 'admin@test.com', password: await bcrypt.hash('123456', 10), role: 'admin' }
    ]);
    
    console.log('Users created:', users.map(u => u.username));
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

createUsers();