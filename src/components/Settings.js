import React, { useState, useEffect } from "react";

function Settings() {
  const [goal, setGoal] = useState({});

  useEffect(() => {
    chrome.storage.local.get("dailyGoals", (result) => {
      if (result.dailyGoals) {
        setGoal(result.dailyGoals);
      }
    });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGoal((prevGoals) => ({
      ...prevGoals,
      [name]: value,
    }));
  };

  const saveGoal = () => {
    chrome.storage.local.set({ dailyGoals: goal });
    alert("Daily goal saved!");
  };

  return (
    <div>
      <h3>Set Daily Goals</h3>
      <input
        type="text"
        name="youtube.com"
        placeholder="Time limit for YouTube (mins)"
        value={goal["youtube.com"] || ""}
        onChange={handleChange}
      />
      <button onClick={saveGoal}>Save</button>
    </div>
  );
}

export default Settings;
