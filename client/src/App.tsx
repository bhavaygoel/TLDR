import React, { useState } from "react";
import "./App.css";

const App: React.FC = () => {
  const [response, setResponse] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [detail, setDetail] = useState<boolean>(false);
  const [points, setPoints] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResponse("");
    try {
      const res = await fetch("http://127.0.0.1:5000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, detail, points }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      const result = await res.json();
      console.log(result);
      setResponse(result.summary);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleDetailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetail(event.target.checked);
  };

  const handlePointsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPoints(event.target.checked);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="url">URL</label>
        <input
          type="text"
          name="url"
          value={url}
          onChange={handleUrlChange}
          required
        />
        <br />
        <label htmlFor="detail">Summarize in detail?</label>
        <input
          type="checkbox"
          name="detail"
          checked={detail}
          onChange={handleDetailChange}
        />
        <br />
        <label htmlFor="points">in points?</label>
        <input
          type="checkbox"
          name="points"
          checked={points}
          onChange={handlePointsChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      <div className="display-linebreak">{response && <p>{response}</p>}</div>
    </div>
  );
};

export default App;
