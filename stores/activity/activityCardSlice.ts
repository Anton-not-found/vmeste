import { IActivity, IActivityCollection } from "@/shared";
import { StateCreator } from "zustand";

export interface IActivityCardState {
  activityCardCollection: IActivityCollection[] | undefined;
  activityCardInfo: Record<string, IActivity> | undefined;
}

export interface IActivityCardActions {
  getActivityCardCollection: () => Promise<void>;
  getActivityCard: () => Promise<void>;
  createActivityCard: () => Promise<void>;
  updateActivityCard: () => Promise<void>;
  deleteActivityCard: () => Promise<void>;
}

export type TActivityCardSlice = IActivityCardState & IActivityCardActions;

const initialState: IActivityCardState = {
  activityCardCollection: undefined,
  activityCardInfo: undefined,
};

export const activityCardSlice: StateCreator<
  { activityCard: TActivityCardSlice },
  [],
  [],
  { activityCard: TActivityCardSlice }
> = (set, get) => ({
  activityCard: {
    ...initialState,
    getActivityCardCollection: async () => {},
    getActivityCard: async () => {},
    createActivityCard: async () => {},
    updateActivityCard: async () => {},
    deleteActivityCard: async () => {},
  },
});
