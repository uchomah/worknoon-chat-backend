# Worknoon Chat - Backend API

Real-time chat backend system built with Node.js, Express, MongoDB, and Socket.IO.

## 🚀 Technologies

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB Atlas** - Cloud database
- **Socket.IO** - Real-time communication
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📋 Features

- ✅ JWT Authentication (Register/Login)
- ✅ User roles: admin, agent, customer, designer, merchant
- ✅ Real-time messaging with Socket.IO
- ✅ Message persistence in MongoDB
- ✅ Conversation history
- ✅ Online/offline user status

## 🔧 Installation

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB

### Setup

1. Clone the repository
2. Run `npm install`
3. Create `.env` file with your MongoDB connection string
4. Run `node server.js`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/users` | Get all users |
| GET | `/api/messages/conversations` | Get conversations |
| POST | `/api/messages` | Send message |

## 👨‍💻 Author

Uchomah - Worknoon Assessment