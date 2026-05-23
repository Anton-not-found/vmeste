import { create } from "zustand";
import { createAuthSlice, IAuthActions, IAuthState } from "./authSlice";

interface IRootStore {
  auth: IAuthState & IAuthActions;
  // Сюда добавятся другие срезы
}

export const useRootStore = create<IRootStore>()((...args) => ({
  ...createAuthSlice(...args),
  // ...createCatalogsSlice(...args), - добавим позже
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
