import 'dotenv/config';
console.log("INDEX SERVER LOADED");

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth';
import favoritesRouter from './routes/favorites';

const app = express();

const PORT = 3001;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/favorites', favoritesRouter);
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
  });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});