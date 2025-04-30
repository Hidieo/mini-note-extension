(function () {
  const existing = document.getElementById("mini-note-wrapper");
  if (existing) {
    existing.remove();
    return;
  }

  const noteWrapper = document.createElement("div");
  noteWrapper.id = "mini-note-wrapper";
  noteWrapper.style.position = "fixed";
  noteWrapper.style.top = "100px";
  noteWrapper.style.left = "100px";
  noteWrapper.style.zIndex = 9999;
  noteWrapper.style.display = "inline-block"; // ⬅️ agar lebar mengikuti konten
  noteWrapper.style.boxSizing = "border-box";

  // Drag bar
  const dragBar = document.createElement("div");
  dragBar.style.height = "20px";
  dragBar.style.background = "#ccc";
  dragBar.style.cursor = "move";
  dragBar.style.borderTopLeftRadius = "5px";
  dragBar.style.borderTopRightRadius = "5px";
  dragBar.style.width = "100%"; // ⬅️ ikut parent
  dragBar.style.boxSizing = "border-box";

  // Textarea
  const noteBox = document.createElement("textarea");
  noteBox.id = "mini-note-box";
  noteBox.placeholder = "Catatan untuk situs ini...";
  noteBox.style.width = "300px"; // boleh tentukan default awal
  noteBox.style.height = "100px";
  noteBox.style.background = "#fff";
  noteBox.style.border = "1px solid #ccc";
  noteBox.style.padding = "10px";
  noteBox.style.borderRadius = "0 0 5px 5px";
  noteBox.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";
  noteBox.style.fontSize = "14px";
  noteBox.style.color = "#000";
  noteBox.style.resize = "both";
  noteBox.style.boxSizing = "border-box";

  noteWrapper.appendChild(dragBar);
  noteWrapper.appendChild(noteBox);
  document.body.appendChild(noteWrapper);

  const hostname = window.location.hostname;
  chrome.storage.local.get([hostname], (result) => {
    noteBox.value = result[hostname] || '';
  });

  noteBox.addEventListener("input", () => {
    chrome.storage.local.set({ [hostname]: noteBox.value });
  });

  // Drag hanya di dragBar
  let isDragging = false, offsetX = 0, offsetY = 0;

  dragBar.addEventListener("mousedown", function (e) {
    isDragging = true;
    offsetX = e.clientX - noteWrapper.getBoundingClientRect().left;
    offsetY = e.clientY - noteWrapper.getBoundingClientRect().top;
    e.preventDefault();
  });

  document.addEventListener("mousemove", function (e) {
    if (isDragging) {
      noteWrapper.style.left = `${e.clientX - offsetX}px`;
      noteWrapper.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener("mouseup", function () {
    isDragging = false;
  });
})();
