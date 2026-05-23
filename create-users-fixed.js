const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, default: 'customer' }
});

const User = mongoose.model('User', userSchema);

async function createUsers() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect('mongodb+srv://emmanuelu108_db_user:O08187657382e@cluster0.czpl6ks.mongodb.net/worknoon-chat');
    console.log('Connected!');
    
    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');
    
    // Hash passwords
    const password1 = await bcrypt.hash('123456', 10);
    const password2 = await bcrypt.hash('123456', 10);
    const password3 = await bcrypt.hash('123456', 10);
    
    console.log('Passwords hashed successfully');
    
    // Create users
    const users = await User.create([
      { username: 'agu', email: 'agu@test.com', password: password1 },
      { username: 'naza', email: 'naza@gmail.com', password: password2 },
      { username: 'sarah', email: 'sarah@test.com', password: password3 }
    ]);
    
    console.log('\n✅ Users created successfully:');
    users.forEach(u => {
      console.log(`   Username: ${u.username}, Email: ${u.email}`);
    });
    
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

createUsers();