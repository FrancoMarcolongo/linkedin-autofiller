function fillLinkedInField() {
  chrome.storage.sync.get("linkedinUrl", (data) => {
    if (!data.linkedinUrl) return;
    const linkedinUrl = data.linkedinUrl.toLowerCase();
    
    findAndFillLinkedInFields(linkedinUrl);
    
    const observer = new MutationObserver((mutations) => {
      let shouldCheck = false;
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          shouldCheck = true;
        }
      });
      
      if (shouldCheck) {
        findAndFillLinkedInFields(linkedinUrl);
      }
    });
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
    
    setTimeout(() => {
      observer.disconnect();
      console.log("LinkedIn field observer stopped after timeout");
    }, 10000);
  });
}

function findAndFillLinkedInFields(linkedinUrl) {
  const inputs = document.querySelectorAll("input");
  console.log("Checking inputs, found:", inputs.length);
  
  inputs.forEach(input => {
    const attributes = 
    [
      input.placeholder || "", 
      input.id || "", 
      input.name || "", 
      input.className || ""
    ]
    .join(" ")
    .toLowerCase();
    
    if (attributes.includes("linkedin") && !input.value) {
      console.log("Found LinkedIn field:", input);
      input.value = linkedinUrl;
      return;
    }
    
    const label = input.previousElementSibling;
    if (label && label.textContent && label.textContent.toLowerCase().includes("linkedin") && !input.value) {
      console.log("Found LinkedIn field with label:", input);
      input.value = linkedinUrl;
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", fillLinkedInField);
} else {
  fillLinkedInField();
}