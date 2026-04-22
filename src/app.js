import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import connectDB from './config/db.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

// middlewares
app.use(cors({
  origin: function (origin, callback) {
    callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  credentials: true,
}));
app.use(express.json());

// Ensure DB is connected before handling any requests (Crucial for Vercel Serverless)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

// routes
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Welcome to ReadingsDotCom API');
});

// error handler middleware
app.use(errorHandler);

export default app;