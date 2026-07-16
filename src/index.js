require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const socketIo = require('socket.io');

const authRoutes = require('./routes/auth');
const tasksRoutes = require('./routes/tasks');
const teamsRoutes = require('./routes/teams');
const paymentsRoutes = require('./routes/payments');
const usersRoutes = require('./routes/users');

const { errorHandler } = require('./middleware/errorHandler');
const { authenticateToken } = require('./middleware/auth');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Public Routes
app.use('/api/v1/auth', authRoutes);

// Protected Routes (require JWT authentication)
app.use('/api/v1/tasks', authenticateToken, tasksRoutes);
app.use('/api/v1/teams', authenticateToken, teamsRoutes);
app.use('/api/v1/users', authenticateToken, usersRoutes);
app.use('/api/v1/payments', authenticateToken, paymentsRoutes);

// WebSocket Connection
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Join team room for real-time updates
  socket.on('join-team', (teamId) => {
    socket.join(`team-${teamId}`);
    console.log(`User joined team: ${teamId}`);
  });

  // Task update broadcast
  socket.on('task-updated', (data) => {
    io.to(`team-${data.teamId}`).emit('task-updated', data);
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 TaskFlow API running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

module.exports = { app, io };