import { atom } from "recoil";

const isClient = typeof window !== "undefined";

const getItemFromLocalStorage = (key: string) => {
  if (!isClient) return null;
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

const setItemInLocalStorage = (key: string, value: string | null) => {
  if (isClient) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const accessTokenState = atom({
  key: "accessTokenState",
  default: getItemFromLocalStorage("accessToken"),
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        setItemInLocalStorage("accessToken", newValue);
      });
    },
  ],
});

export const refreshTokenState = atom({
  key: "refreshTokenState",
  default: getItemFromLocalStorage("refreshToken"),
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        setItemInLocalStorage("refreshToken", newValue);
      });
    },
  ],
});

export const userIdState = atom({
  key: "userIdState",
  default: getItemFromLocalStorage("userId"),
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        setItemInLocalStorage("userId", newValue);
      });
    },
  ],
});
