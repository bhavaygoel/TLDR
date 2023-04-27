import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css";

const App: React.FC = () => {
  const [response, setResponse] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [detail, setDetail] = useState<boolean>(true);
  const [points, setPoints] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const queryInfo = { active: true, lastFocusedWindow: true };

    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const siteUrl = tabs[0].url;
        if (siteUrl) setUrl(siteUrl);
      });
  }, []);
  useEffect(() => {
    const fetchData = async () => {
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
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url, detail, points]);

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleDetailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetail(event.target.checked);
  };

  const handlePointsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPoints(event.target.checked);
  };
  let circleCommonClasses = "h-3.5 w-3.5 bg-pink-500 rounded-full";

  return (
    <div className="px-5 py-5 ">
      {isLoading ? (
        <div className="flex justify-center items-center h-96 w-full">
          <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
          <div
            className={`${circleCommonClasses} mr-1 animate-bounce200`}
          ></div>
          <div className={`${circleCommonClasses} animate-bounce400`}></div>
        </div>
      ) : (
        <>
          <div className="rounded-lg bg-slate-200 p-5">
            {response && <p className="whitespace-pre-wrap">{response}</p>}
          </div>
          <h1 className="mt-5 font-semibold ">Summary options:</h1>
          <form className="flex flex-row justify-start" action="">
            <div>
              <label htmlFor="detail">Detailed</label>
              <input
                type="checkbox"
                name="detail"
                checked={detail}
                className="ml-1 relative bottom-0.5 rounded text-pink-500"
                onChange={handleDetailChange}
              />
            </div>
            <div className="ml-4">
              <label htmlFor="points">Points</label>
              <input
                type="checkbox"
                name="points"
                checked={points}
                className="ml-1 relative bottom-0.5 rounded text-pink-500"
                onChange={handlePointsChange}
              />
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default App;
