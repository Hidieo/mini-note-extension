// background.js
chrome.commands.onCommand.addListener((command) => {
  if (command === "toggle_notes_input") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["injectNoteBox.js"]
      });
    });
  }
});
