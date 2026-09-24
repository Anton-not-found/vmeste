import { apiClient } from "@/lib";

export interface ICreateActivityRequest {
  title: string;
  description: string;
  category: number | null;
  activateOnUtc: string;
  location: string;
  address?: string;
  price: number;
  maxParticipants: number;
  imageUrl?: string;
}


export const createActivity = async (data: ICreateActivityRequest) => {
  const response = await apiClient.post('/api/activities', data);
  return response.data;
};