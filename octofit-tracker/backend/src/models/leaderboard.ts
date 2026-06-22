import { Schema, model } from 'mongoose';

export interface LeaderboardDocument {
  name: string;
  type: 'user' | 'team';
  score: number;
  rank: number;
}

const leaderboardSchema = new Schema<LeaderboardDocument>({
  name: { type: String, required: true },
  type: { type: String, enum: ['user', 'team'], required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true }
});

export const LeaderboardModel = model<LeaderboardDocument>('LeaderboardEntry', leaderboardSchema);
