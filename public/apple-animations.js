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
  
  // Set random loading message every 2 seconds
  function setRandomLoadingMessage() {
    const randomIndex = Math.floor(Math.random() * funnyLoadingMessages.length);
    loadingMessage.textContent = funnyLoadingMessages[randomIndex];
    
    // Add fade effect
    loadingMessage.style.opacity = 0;
    setTimeout(() => {
      loadingMessage.style.opacity = 1;
    }, 200);
  }

  // Initialize loading behavior
  let loadingInterval = setInterval(setRandomLoadingMessage, 2000);
  setRandomLoadingMessage(); // Set initial message
  
  // Simulate loading (3 seconds for demo purposes)
  setTimeout(() => {
    clearInterval(loadingInterval);
    loadingOverlay.classList.add('hidden');
  }, 3000);
  
  // Handle iframe loading
  const webFrame = document.getElementById('web');
  
  // Listen for navigation in the iframe
  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
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
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-2px)';
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
});
