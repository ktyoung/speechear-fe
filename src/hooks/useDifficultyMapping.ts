import { useMemo } from "react";

type DifficultyMapping = {
  [key: string]: string;
};

export const useDifficultyMapping = ({
  level,
  mapping,
}: {
  level?: string;
  mapping: DifficultyMapping;
}): string => {
  const difficultyText = useMemo(() => {
    return level ? mapping[level] || "난이도 미정" : "난이도 미정";
  }, [level, mapping]);

  return difficultyText;
};
