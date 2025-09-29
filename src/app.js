import express from 'express';
import cors from 'cors';

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//Test Route
app.get('/', (req, res) => {
    res.send('Salam jhjkhjkhh');
})

export default app;