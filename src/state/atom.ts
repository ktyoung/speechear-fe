import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  storage: localStorage,
  converter: JSON,
});

export const modalState = atom({
  key: "isOpen",
  default: false,
});

export const jwtTokenState = atom({
  key: "jwtToken",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
