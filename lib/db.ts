import mongoose from "mongoose";

export async function dbConnect() {
  try {
    if (!process.env.MONGODB_URI) return
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected Successfull🟢')
  } catch (error: any) {
    throw new Error('Failed to connect: ',error)
  }
}

export default dbConnect;
