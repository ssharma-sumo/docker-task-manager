const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const express = require('express');
const { connectDB } = require('./db');
const tasksRouter = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || 'app';

app.use((_req, res, next) => {
  res.setHeader('X-App-Name', APP_NAME);
  res.setHeader('X-App-Instance', APP_NAME);
  next();
});

app.use(express.json());

app.get('/health', (_req, res) => {
  res.set('X-App-Name', APP_NAME);
  res.set('X-App-Instance', APP_NAME);
  res.json({ status: 'ok' });
});

app.use('/api/tasks', tasksRouter);

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
