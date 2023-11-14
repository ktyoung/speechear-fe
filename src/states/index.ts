import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  storage: localStorage,
  converter: JSON,
});

export const myPageModalState = atom({
  key: "isMyPageOpen",
  default: false,
});

export const globalConfigModalState = atom({
  key: "isGlobalConfigOpen",
  default: false,
});

export const trainingData = atom({
  key: "trainginData",
  default: {},
});

export const gConfigState = atom({
  key: "config",
  default: {
    volume: 100,
    rate: 1.0,
    noise: "noise1",
  },
  effects_UNSTABLE: [persistAtom],
});

export const jwtTokenState = atom({
  key: "jwtToken",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
