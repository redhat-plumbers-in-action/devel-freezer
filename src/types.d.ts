export type TConfigObject = {
  policy: TPolicyItem[];
};

export type TPolicyItem = {
  tags: string[];
  feedback: TFeedback;
};

export type TFeedback = {
  'freezed-state': string;
  'un-freezed-state': string;
};
