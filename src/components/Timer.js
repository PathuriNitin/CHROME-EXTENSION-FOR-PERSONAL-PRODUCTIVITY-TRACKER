import React, { useState, useEffect } from "react";
function Timer() {
  const [currentSite, setCurrentSite] = useState("");
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    const updateActiveTab = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          const url = new URL(tabs[0].url);
          setCurrentSite(url.hostname);
        }
      });
    };

    updateActiveTab();
    const interval = setInterval(updateActiveTab, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
      chrome.storage.local.get("websiteData", (result) => {
        let data = result.websiteData || {};
        data[currentSite] = (data[currentSite] || 0) + 1;
        chrome.storage.local.set({ websiteData: data });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentSite]);

  return (
    <div>
      <h3>Currently Browsing</h3>
      <p>{currentSite || "No Active Tab"}</p>
      <p>Time Spent: {timeSpent} sec</p>
    </div>
  );
}

export default Timer;
