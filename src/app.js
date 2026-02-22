import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

// middlewares
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());

// routes
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Welcome to Smart OCR');
});

// error handler middleware
app.use(errorHandler);

export default app;