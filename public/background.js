let websiteData = {};
let activeTabId = null;
let startTime = null;

chrome.tabs.onActivated.addListener(activeInfo => {
  if (activeTabId && startTime) {
    const endTime = Date.now();
    const timeSpent = (endTime - startTime) / 1000;

    chrome.tabs.get(activeTabId, tab => {
      if (tab && tab.url) {
        const url = new URL(tab.url).hostname;
        if (!websiteData[url]) {
          websiteData[url] = 0;
        }
        websiteData[url] += timeSpent;
        chrome.storage.local.set({ websiteData });
      }
    });
  }

  activeTabId = activeInfo.tabId;
  startTime = Date.now();
});
