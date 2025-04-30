document.addEventListener('DOMContentLoaded', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = new URL(tab.url).hostname;

  const noteEl = document.getElementById('note');
  const saveBtn = document.getElementById('save');

  chrome.storage.local.get([url], (result) => {
    noteEl.value = result[url] || '';
  });

  saveBtn.addEventListener('click', () => {
    const note = noteEl.value;
    chrome.storage.local.set({ [url]: note });
  });
});