chrome.action.onClicked.addListener((tab) => {
  // Ensure we are on a valid Sleeper league page
  if (!tab.id || !tab.url || !tab.url.startsWith('https://sleeper.com/leagues/')) {
    return;
  }

  // Execute script in the active tab
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      // Find the panels (checking potential spelling variations for the right panel)
      const rightPanel = document.querySelector('div.right-panel');
      const centerPanel = document.querySelector('div.center-panel');
      
      if (rightPanel) {
        const isHidden = rightPanel.style.display === 'none';

        if (!isHidden) {
          // Hide right panel and expand center panel
          rightPanel.style.display = 'none';
          if (centerPanel) {
            centerPanel.style.maxWidth = 'none';
            centerPanel.style.width = '100%';
          }
        } else {
          // Show right panel and restore center panel defaults
          rightPanel.style.display = '';
          if (centerPanel) {
            centerPanel.style.maxWidth = '800px';
            centerPanel.style.width = '';
          }
        }
      } else {
        console.log('Right panel element not found on this page.');
      }
    }
  });
});
