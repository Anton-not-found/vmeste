export interface IActivityCollection {
  id: string;
  title: string;
  description: string;
  category: string;
  activateOnUtc: string;
  location: string;
  price: number;
  currentParticipants: number;
  maxParticipants: number;
  imageUrl?: string;
  isAuthor: boolean;
  isFavorite?: boolean;
}

export interface IActivity extends IActivityCollection {
  fullDescription?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
  author: IActivityAuthor;
}

export interface IActivityAuthor {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
}
