import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import app from './src/app.js';

dotenv.config();

// Connect to MongoDB
connectDB();

// Only listen locally if we are not in production (Vercel sets NODE_ENV to production)
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));
}

// Export the Express API for Vercel
export default app;