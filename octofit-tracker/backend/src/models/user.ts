import { Schema, model } from 'mongoose';

export interface UserDocument {
  name: string;
  email: string;
  role: 'athlete' | 'coach' | 'admin';
  team?: string;
  createdAt: Date;
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['athlete', 'coach', 'admin'], default: 'athlete' },
  team: { type: String },
  createdAt: { type: Date, default: () => new Date() }
});

export const UserModel = model<UserDocument>('User', userSchema);
