import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
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

// routes
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Welcome to ReadingsDotCom API');
});

// error handler middleware
app.use(errorHandler);

export default app;