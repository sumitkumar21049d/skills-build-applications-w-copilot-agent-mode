import { Schema, model } from 'mongoose';

export interface TeamDocument {
  name: string;
  description: string;
  members: string[];
  createdAt: Date;
}

const teamSchema = new Schema<TeamDocument>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  members: { type: [String], default: [] },
  createdAt: { type: Date, default: () => new Date() }
});

export const TeamModel = model<TeamDocument>('Team', teamSchema);
