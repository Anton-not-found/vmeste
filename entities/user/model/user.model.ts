import mongoose, { Schema, Types, Document } from "mongoose";

export interface IUserDB extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  city?: string;
  avatar?: string;
  rating: number;
  createdAt: Date;
}

const UserSchema = new Schema<IUserDB>({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
    select: false,
  },
  firstName: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  avatar: {
    type: String,
    default: "",
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User =
  mongoose.models.User || mongoose.model<IUserDB>("User", UserSchema);

export default User;

export interface IUserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName?: string;
  city?: string;
  avatar?: string;
  rating: number;
  createdAt: string;
}

// Функция трансформации
export function toUserResponse(user: IUserDB): IUserResponse {
  return {
    id: user._id.toString(),
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    city: user.city,
    avatar: user.avatar,
    rating: user.rating,
    createdAt: user.createdAt.toISOString(),
  };
}
