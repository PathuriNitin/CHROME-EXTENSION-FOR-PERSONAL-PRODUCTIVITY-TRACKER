// Function to format seconds into HH:MM:SS
export function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs}h ${mins}m ${secs}s`;
}

// Function to get website hostname from URL
export function getHostname(url) {
  try {
    return new URL(url).hostname;
  } catch (error) {
    return "Unknown Site";
  }
}

// Function to retrieve data from Chrome storage
export function getStoredData(key, callback) {
  chrome.storage.local.get(key, (result) => {
    callback(result[key] || {});
  });
}

// Function to save data to Chrome storage
export function saveDataToStorage(key, data) {
  chrome.storage.local.set({ [key]: data });
}
