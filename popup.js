document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("linkedinUrl");
  const button = document.getElementById("save");

  chrome.storage.sync.get("linkedinUrl", (data) => {
      if (data.linkedinUrl) {
          input.value = data.linkedinUrl;
      }
  });

  button.addEventListener("click", () => {
      const url = input.value.trim();
      chrome.storage.sync.set({ linkedinUrl: url }, () => {
          alert("URL de LinkedIn guardada.");
      });
  });
});
