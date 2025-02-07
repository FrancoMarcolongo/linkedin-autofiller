chrome.storage.sync.get("linkedinUrl", (data) => {
  if (!data.linkedinUrl) return;

  const linkedinUrl = data.linkedinUrl.toLowerCase();
  const inputs = document.querySelectorAll("input");

  inputs.forEach(input => {
      const attributes = [input.placeholder, input.id, input.name, input.className]
          .join(" ")
          .toLowerCase();

      if (attributes.includes("linkedin")) {
          input.value = linkedinUrl;
          return;
      }

      const label = input.previousElementSibling;
      if (label && label.textContent.toLowerCase().includes("linkedin")) {
          input.value = linkedinUrl;
      }
  });
});