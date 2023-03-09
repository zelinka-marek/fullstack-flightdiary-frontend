import { useEffect, useState } from "react";
import { getAllDiaries } from "./services/diary";
import { DiaryEntry } from "./types";

export function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then(setDiaries);
  }, []);

  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map((entry) => (
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          <div>
            visibility: <strong>{entry.visibility}</strong>
          </div>
          <div>
            weather: <strong>{entry.weather}</strong>
          </div>
        </div>
      ))}
    </div>
  );
}
