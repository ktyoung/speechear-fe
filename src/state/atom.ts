import { atom } from "recoil";

export const modalState = atom({
  key: "isOpen",
  default: false,
});
