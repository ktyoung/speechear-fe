import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  storage: localStorage,
  converter: JSON,
});

export const modalState = atom({
  key: "isModalOpen",
  default: false,
});

export const testModalState = atom({
  key: "isTestModalOpen",
  default: false,
});

export const globalConfigModalState = atom({
  key: "isGlobalConfigOpen",
  default: false,
});

interface TrainingItem {
  index: string;
  filename: string;
  context: string;
  speechcode: string;
  speechcontext: string;
  answer: string;
}
export const trainingData = atom<TrainingItem[]>({
  key: "trainingData",
  default: [],
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
