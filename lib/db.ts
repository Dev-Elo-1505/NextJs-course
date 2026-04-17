import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;
let isConnected = false;

async function dbConnect() {
  if (isConnected) {
    console.log("Mongodb already connected");
    return;
  }

  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  try {
    const db = await mongoose.connect(MONGODB_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log("Mongodb already connected");
  } catch (error) {
    console.error("Failed to connect to mongodb:", error);
    throw error;
  }
}

export default dbConnect;
