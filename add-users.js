const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, default: 'customer' }
});

const User = mongoose.model('User', userSchema);

async function addUsers() {
  try {
    await mongoose.connect('mongodb+srv://emmanuelu108_db_user:O08187657382e@cluster0.czpl6ks.mongodb.net/worknoon-chat');
    console.log('Connected to MongoDB');
    
    // Delete all existing users (optional - comment out if you want to keep existing)
    await User.deleteMany({});
    console.log('Cleared existing users');
    
    // Create new users
    const users = await User.create([
      { username: 'agu', email: 'agu@test.com', password: await bcrypt.hash('123456', 10) },
      { username: 'naza', email: 'naza@gmail.com', password: await bcrypt.hash('123456', 10) },
      { username: 'sarah', email: 'sarah@test.com', password: await bcrypt.hash('123456', 10) }
    ]);
    
    console.log('Users created successfully:');
    users.forEach(u => console.log(`- ${u.username} (${u.email})`));
    
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

addUsers();