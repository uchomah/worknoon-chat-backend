const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// Message Schema
const messageSchema = new mongoose.Schema({
  senderId: String,
  receiverId: String,
  text: String,
  timestamp: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

// Create server for Socket.IO
const server = app.listen(5000, () => {
  console.log('🚀 Server on port 5000');
});

const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join user to their personal room
  socket.on('join', (userId) => {
    socket.join(`user_${userId}`);
    console.log(`User ${userId} joined their room`);
  });

  // Handle sending messages
  socket.on('send_message', async (data) => {
    const { senderId, receiverId, text } = data;
    
    // Save message to database
    const message = new Message({ senderId, receiverId, text });
    await message.save();
    
    // Emit to receiver's room
    io.to(`user_${receiverId}`).emit('receive_message', {
      senderId,
      text,
      timestamp: message.timestamp
    });
    
    // Also echo back to sender
    socket.emit('message_sent', {
      receiverId,
      text,
      timestamp: message.timestamp
    });
  });

  // Get chat history
  socket.on('get_history', async (data) => {
    const { userId, otherUserId } = data;
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId }
      ]
    }).sort('timestamp');
    
    socket.emit('chat_history', messages);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

console.log('Socket.IO server running');