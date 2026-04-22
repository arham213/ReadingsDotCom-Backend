import mongoose from 'mongoose';

// Global is used here to ensure the connection is cached across hot reloads in development
// and reused across serverless function executions in production.
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        // bufferCommands: false prevents Mongoose from hanging up for 10000ms if not connected.
        // It will fail fast and let us know if there's an IP whitelist issue.
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongoose) => {
            console.log('MongoDB Connected Successfully');
            return mongoose;
        }).catch((error) => {
            console.error('MongoDB connection failed: ', error.message);
            cached.promise = null; // Reset promise so next request can retry
            throw error;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectDB;


// import { MongoClient, ServerApiVersion } from 'mongodb';
// const uri = "mongodb+srv://arham83:dvRewmKJCy9BobZe@readingsdotcom.eyzjnnb.mongodb.net/?appName=ReadingsDotCom";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function connectDB() {
//   try {
//     console.log("Connecting to MongoDB...");
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// connectDB().catch(console.dir);
// export default connectDB;