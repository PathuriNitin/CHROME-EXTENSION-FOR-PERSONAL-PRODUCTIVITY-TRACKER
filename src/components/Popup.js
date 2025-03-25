import React, { useState, useEffect } from "react";

const Popup = () => {
  const [goal, setGoal] = useState("");

  useEffect(() => {
    chrome.storage.local.get("dailyGoal", (data) => {
      if (data.dailyGoal) setGoal(data.dailyGoal);
    });
  }, []);

  const handleSave = () => {
    chrome.storage.local.set({ dailyGoal: goal }, () => {
      alert("✅ Goal Saved!");
    });
  };

  return (
    <div style={{ padding: "10px", width: "200px" }}>
      <h3>Set Your Daily Goal</h3>
      <input
        type="text"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Enter your goal..."
      />
      <button onClick={handleSave}>Save Goal</button>
    </div>
  );
};

export default Popup;
