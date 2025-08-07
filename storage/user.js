import { create } from "zustand";
import { persist } from "zustand/middleware";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const useUserStore = create()(
  persist(
    (set) => ({
        user:{
            name:"",
            division:""
        },
      login: false,
      setLogin: (login) => set({ login }),
      setUser:(user) => set({user})
    }),
    {
      name: "user-storage",
      storage: {
        getItem: async (key) => {
          const value = await AsyncStorage.getItem(key);
          return value ?? null;
        },
        setItem: async (key, value) => {
          await AsyncStorage.setItem(key, value);
        },
        removeItem: async (key) => {
          await AsyncStorage.removeItem(key);
        },
      },
    }
  )
);
