import mongoose from 'mongoose';

export const MONGO_URI = 'mongodb://127.0.0.1:27017/octofit_db';

export function connectToDatabase() {
  mongoose.set('strictQuery', false);
  return mongoose.connect(MONGO_URI);
}
