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
const paddleRoutes = require('./routes/paddle');
const usersRoutes = require('./routes/users');
const landingRoutes = require('./routes/landing');

const { errorHandler } = require('./middleware/errorHandler');
const { authenticateToken } = require('./middleware/auth');
const { limiter, authLimiter } = require('./middleware/rateLimiter');
const { requestLogger } = require('./middleware/requestLogger');

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
app.use(requestLogger);
app.use(limiter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Landing page (public)
app.use('/', landingRoutes);

// Public Routes
app.use('/api/v1/auth', authLimiter, authRoutes);
app.use('/api/v1/paddle', paddleRoutes);

// Protected Routes
app.use('/api/v1/tasks', authenticateToken, tasksRoutes);
app.use('/api/v1/teams', authenticateToken, teamsRoutes);
app.use('/api/v1/users', authenticateToken, usersRoutes);

// WebSocket Connection
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join-team', (teamId) => {
    socket.join(`team-${teamId}`);
    console.log(`User joined team: ${teamId}`);
  });

  socket.on('task-updated', (data) => {
    io.to(`team-${data.teamId}`).emit('task-updated', data);
  });

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
  console.log(`🌐 Web: http://localhost:${PORT}`);
  console.log(`📊 API: http://localhost:${PORT}/api/v1`);
});

module.exports = { app, io };