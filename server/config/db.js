import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/resume_checker';
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 3000, // Timeout fast if MongoDB isn't running
    });
    isConnected = true;
    console.log(`[MongoDB] Connected successfully to: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    isConnected = false;
    console.warn(`[MongoDB Notice] Could not connect to local MongoDB database (${error.message}).`);
    console.warn(`[MongoDB Notice] ResumAI will run with local in-memory fallback state for past history.`);
  }
};

export const getDBStatus = () => isConnected;
