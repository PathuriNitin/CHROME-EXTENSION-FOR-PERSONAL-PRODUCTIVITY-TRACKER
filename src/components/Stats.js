import React, { useState, useEffect } from "react";

function Stats() {
  const [data, setData] = useState({});

  useEffect(() => {
    chrome.storage.local.get("websiteData", (result) => {
      if (result.websiteData) {
        setData(result.websiteData);
      }
    });
  }, []);

  return (
    <div>
      <h3>Website Usage</h3>
      <ul>
        {Object.entries(data).map(([site, time]) => (
          <li key={site}>
            {site}: {time.toFixed(2)} sec
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Stats;
