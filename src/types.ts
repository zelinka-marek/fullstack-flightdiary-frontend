export type DiaryEntry = {
  id: number;
  date: string;
  weather: string;
  visibility: string;
};

export type NewDiaryEntry = Omit<DiaryEntry, "id">;
