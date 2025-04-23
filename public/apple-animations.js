// Apple-style animations and loading messages
document.addEventListener('DOMContentLoaded', function() {
  // Funny loading messages
  const funnyLoadingMessages = [
    "Polishing the pixels...",
    "Warming up the quantum processor...",
    "Searching for signal in parallel universes...",
    "Convincing electrons to cooperate...",
    "Brewing digital coffee for the servers...",
    "Unfolding digital origami...",
    "Downloading more RAM...",
    "Generating witty loading messages...",
    "Aligning the digital chakras...",
    "Reticulating splines...",
    "Thinking differently since 1976...",
    "Bending the laws of physics...",
    "Making the impossible possible...",
    "One more thing...",
    "Innovating at the speed of light...",
    "Teaching AI to appreciate art...",
    "Connecting invisible dots...",
    "Disrupting the status quo...",
    "Calculating the meaning of life...",
    "Preparing your digital experience..."
  ];
  
  // Elements
  const loadingOverlay = document.getElementById('loadingOverlay');
  const loadingMessage = document.getElementById('loadingMessage');
  const searchInput = document.getElementById('search');
  
  // Force hide the loading overlay in case it's stuck (emergency fallback)
  window.removeLoadingOverlay = function() {
    if (loadingOverlay) {
      loadingOverlay.classList.add('hidden');
      console.log('Loading overlay forcibly removed');
      clearInterval(loadingInterval);
      
      // Double check with a slight delay to ensure it's removed
      setTimeout(() => {
        loadingOverlay.style.display = 'none';
        console.log('Loading overlay display set to none');
      }, 600);
    }
  };
  
  // Add a force-hide button just in case (will be hidden automatically)
  const forceHideButton = document.createElement('button');
  forceHideButton.innerText = "Click to continue";
  forceHideButton.style.marginTop = "20px";
  forceHideButton.style.padding = "8px 16px";
  forceHideButton.style.borderRadius = "8px";
  forceHideButton.style.backgroundColor = "#0071e3";
  forceHideButton.style.color = "white";
  forceHideButton.style.border = "none";
  forceHideButton.style.cursor = "pointer";
  forceHideButton.onclick = window.removeLoadingOverlay;
  
  loadingOverlay.appendChild(forceHideButton);
  
  // Set random loading message every 2 seconds
  let currentMsgIndex = -1;
  
  function setRandomLoadingMessage() {
    // Make sure we don't show the same message twice in a row
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * funnyLoadingMessages.length);
    } while (randomIndex === currentMsgIndex);
    
    currentMsgIndex = randomIndex;
    
    // Fade out current message
    loadingMessage.style.opacity = 0;
    
    // Change text and fade in after a short delay
    setTimeout(() => {
      loadingMessage.textContent = funnyLoadingMessages[currentMsgIndex];
      loadingMessage.style.opacity = 1;
    }, 300);
  }

  // Initialize loading behavior
  let loadingInterval = setInterval(setRandomLoadingMessage, 2000);
  setRandomLoadingMessage(); // Set initial message
  
  // Safety timeout to ensure overlay is eventually removed
  setTimeout(window.removeLoadingOverlay, 6000);
  
  // Normal loading timeout
  setTimeout(() => {
    clearInterval(loadingInterval);
    loadingOverlay.classList.add('hidden');
    
    // Debug log to verify loading messages were changing
    console.log('Loading complete - Messages were cycling through:', currentMsgIndex);
  }, 4000); // Extended to 4 seconds to see more loading messages
  
  // Handle iframe loading
  const webFrame = document.getElementById('web');
  
  // Listen for navigation in the iframe
  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      // Show loading overlay
      loadingOverlay.classList.remove('hidden');
      loadingInterval = setInterval(setRandomLoadingMessage, 2000);
      setRandomLoadingMessage();
      
      // Hide loading overlay after the frame loads
      // This is a simplified version that uses a timeout
      // In a real implementation, you would listen to the iframe's load event
      setTimeout(() => {
        clearInterval(loadingInterval);
        loadingOverlay.classList.add('hidden');
      }, 2000);
    }
  });
  
  // Add hover effects to buttons
  const buttons = document.querySelectorAll('.control-button');
  console.log('Found control buttons:', buttons.length); // Debug log
  
  buttons.forEach((button, index) => {
    // Debug log to verify button registration
    console.log('Registered button:', index);
    
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-2px)';
      console.log('Button hover:', index); // Debug hover
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
    });
  });
  
  // Add the slight hover effect to search input
  searchInput.addEventListener('mouseenter', () => {
    searchInput.style.transform = 'translateY(-2px)';
  });
  
  searchInput.addEventListener('mouseleave', () => {
    if (document.activeElement !== searchInput) {
      searchInput.style.transform = 'translateY(0)';
    }
  });
  
  // Add focus animation for search input
  searchInput.addEventListener('focus', () => {
    searchInput.style.transform = 'translateY(-2px)';
  });
  
  searchInput.addEventListener('blur', () => {
    searchInput.style.transform = 'translateY(0)';
  });
  
  // Apply subtle animations to various elements
  function applyRandomAnimation() {
    const header = document.querySelector('header h1');
    header.style.animation = 'pulse 2s ease';
    
    // Reset animation after it completes
    setTimeout(() => {
      header.style.animation = '';
    }, 2000);
  }
  
  // Apply random animations periodically
  setInterval(applyRandomAnimation, 10000);
  
  // Log to verify script loaded
  console.log('Apple animations loaded');
});
