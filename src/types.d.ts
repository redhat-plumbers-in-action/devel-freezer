export type TConfigObject = {
  policy: TPolicyItem[];
};

export type TPolicyItem = {
  tags: string[];
  feedback: TFeedback;
};

export type TFeedback = {
  'frozen-state': string;
  'unfreeze-state': string;
};
