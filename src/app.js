import express from 'express';
import cors from 'cors';
import router from './routers/index.js';

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// // Test Route
// app.get('/', (req, res) => {
//     res.send('Salam');
// })

// routes
app.use('/api', router);

export default app;