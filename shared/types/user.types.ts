export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName?: string;
  city?: string;
  avatar?: string;
  rating: number;
  createdAt: string;
}