/* global chrome */
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    chrome.storage.local.get("websiteData", result => {
      if (result.websiteData) {
        setData(result.websiteData);
      }
    });
  }, []);

  return (
    <div style={{ width: "300px", padding: "10px" }}>
      <h2>Productivity Tracker</h2>
      <ul>
        {Object.entries(data).map(([site, time]) => (
          <li key={site}>{site}: {time.toFixed(2)} sec</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
