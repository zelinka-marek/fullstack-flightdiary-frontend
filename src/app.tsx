import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { createDiary, getAllDiaries } from "./services/diary";
import { NonSensitiveDiaryEntry } from "./types";

export function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    getAllDiaries().then(setDiaries);
  }, []);

  async function addDiary(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (errorMessage) {
      setErrorMessage(null);
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const entry = await createDiary({
        date: String(formData.get("date")),
        weather: String(formData.get("weather")),
        visibility: String(formData.get("visibility")),
        comment: String(formData.get("comment")),
      });

      setDiaries((diaries) => diaries.concat(entry));

      form.reset();
      (form.elements.item(0) as HTMLElement)?.focus();
    } catch (error) {
      if (axios.isAxiosError<string>(error)) {
        setErrorMessage(error.response?.data || error.message);
      }
    }
  }

  return (
    <div>
      <h2>Add new entry</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={addDiary}>
        <div>
          <label htmlFor="date">Date</label>{" "}
          <input type="date" name="date" id="date" />
        </div>
        <fieldset>
          <legend>Weather</legend>{" "}
          <div style={{ display: "flex", gap: 8 }}>
            <label>
              <input type="radio" name="weather" value="sunny" /> Sunny
            </label>
            <label>
              <input type="radio" name="weather" value="rainy" /> Rainy
            </label>
            <label>
              <input type="radio" name="weather" value="cloudy" /> Cloudy
            </label>
            <label>
              <input type="radio" name="weather" value="windy" /> Windy
            </label>
            <label>
              <input type="radio" name="weather" value="stormy" /> Stormy
            </label>
          </div>
        </fieldset>
        <fieldset>
          <legend>Visibility</legend>{" "}
          <div style={{ display: "flex", gap: 8 }}>
            <label>
              <input type="radio" name="visibility" value="great" /> Great
            </label>
            <label>
              <input type="radio" name="visibility" value="good" /> Good
            </label>
            <label>
              <input type="radio" name="visibility" value="ok" /> Ok
            </label>
            <label>
              <input type="radio" name="visibility" value="poor" /> Poor
            </label>
          </div>
        </fieldset>
        <div>
          <label htmlFor="comment">Comment</label>{" "}
          <input type="text" name="comment" id="comment" />
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
