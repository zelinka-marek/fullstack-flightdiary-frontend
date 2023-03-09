export type DiaryEntry = {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
};

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;

export type NewDiaryEntry = Omit<DiaryEntry, "id">;
