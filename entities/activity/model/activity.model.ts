import mongoose, { Schema, Document, Types } from 'mongoose';
import { EActivityCategory } from '@/shared/types/activity.types';

export interface IActivityDB extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  category?: EActivityCategory;
  date: Date;       
  location: string;
  address?: string;
  price: number;
  maxParticipants: number;
  imageUrl?: string;
  authorId: Types.ObjectId;
  participants: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ActivitySchema = new Schema<IActivityDB>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: Number, enum: Object.values(EActivityCategory).filter(v => typeof v === 'number'), required: false },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    address: { type: String },
    price: { type: Number, default: 0, min: 0 },
    maxParticipants: { type: Number, required: true, min: 1 },
    imageUrl: { type: String },
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  },
  {
    timestamps: true,
  }
);

export const Activity = mongoose.models.Activity || mongoose.model<IActivityDB>('Activity', ActivitySchema);