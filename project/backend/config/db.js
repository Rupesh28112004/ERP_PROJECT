import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    // Skip connection during build
    if (!mongoURI) {
      console.warn('⚠️ MONGODB_URI not set - MongoDB connection skipped');
      return null;
    }

    await mongoose.connect(mongoURI);

    console.log('✅ MongoDB connected successfully');
    return mongoose.connection;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    // Don't exit process - allows server to start anyway
    return null;
  }
};

export default mongoose;
