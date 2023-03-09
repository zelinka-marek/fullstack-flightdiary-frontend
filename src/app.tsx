import { FormEvent, useEffect, useState } from "react";
import { createDiary, getAllDiaries } from "./services/diary";
import { NonSensitiveDiaryEntry } from "./types";

export function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then(setDiaries);
  }, []);

  async function addDiary(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const entry = await createDiary({
      date: String(formData.get("date")),
      weather: String(formData.get("weather")),
      visibility: String(formData.get("visibility")),
      comment: String(formData.get("comment")),
    });

    setDiaries((diaries) => diaries.concat(entry));

    form.reset();
    (form.elements.item(0) as HTMLElement)?.focus();
  }

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={addDiary}>
        <div>
          <label htmlFor="date">Date</label>{" "}
          <input type="date" name="date" id="date" required />
        </div>
        <div>
          <label htmlFor="weather">Weather</label>{" "}
          <select name="weather" id="weather" required>
            <option></option>
            <option value="sunny">Sunny</option>
            <option value="rainy">Rainy</option>
            <option value="cloudy">Cloudy</option>
            <option value="windy">Windy</option>
            <option value="stormy">Stormy</option>
          </select>
        </div>
        <div>
          <label htmlFor="visibility">Visibility</label>{" "}
          <select name="visibility" id="visibility" required>
            <option></option>
            <option value="great">Great</option>
            <option value="good">Good</option>
            <option value="ok">Ok</option>
            <option value="poor">Poor</option>
          </select>
        </div>
        <div>
          <label htmlFor="comment">Comment</label>{" "}
          <input type="text" name="comment" id="comment" required />
        </div>
        <button type="submit">Add</button>
      </form>
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
