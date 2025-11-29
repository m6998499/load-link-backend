import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import path from 'path';

import authRoutes from './routes/auth.routes';
import loadRoutes from './routes/load.routes';
import messageRoutes from './routes/message.routes';
import adminRoutes from './routes/admin.routes';
import { initializeSocket } from './socket';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/loads', loadRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/admin', adminRoutes);

// Root check route
app.get('/', (req, res) => {
  res.json({ message: "LoadLink backend is running" });
});

// Create HTTP server & enable socket.io
const server = http.createServer(app);
initializeSocket(server);

// Start server
server.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
