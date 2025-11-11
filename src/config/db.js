import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log('MongoDB Connected Succesfully');
    } catch (error) {
        console.error('MongoDB connection failed: ', error.message);
        process.exit(1);
    }
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