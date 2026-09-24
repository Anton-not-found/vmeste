import { create } from "zustand";
import { authSlice, IAuthActions, IAuthState, TAuthSlice } from "./auth/authSlice";
import { activityCardSlice, IActivityCardActions, IActivityCardState, TActivityCardSlice } from "./activity";

interface IRootStore {
  auth: TAuthSlice;
  activityCard: TActivityCardSlice
 
}

export const useRootStore = create<IRootStore>()((...args) => ({
  ...authSlice(...args),
  ...activityCardSlice(...args),
 
}));

function getOnlyData<T extends Record<string, any>>(obj: T): Partial<T> {
  const result: Record<string, any> = {};
  for (const key in obj) {
    if (typeof obj[key] !== "function") {
      result[key] = obj[key];
    }
  }
  return result as Partial<T>;
}

if (typeof window !== "undefined") {
  (window as any).__store = {
    getState: () => {
      const fullState = useRootStore.getState();

      const cleanState: Record<string, any> = {};
      for (const sliceName in fullState) {
        const slice = fullState[sliceName as keyof IRootStore];
        cleanState[sliceName] = getOnlyData(slice);
      }
      return cleanState;
    },
    getRaw: {
      auth: () => useRootStore.getState().auth,
      // catalogs: () => useAppStore.getState().catalogs, // добавим позже
    },
    getData: {
      auth: () => getOnlyData(useRootStore.getState().auth),
    },
  };
}
