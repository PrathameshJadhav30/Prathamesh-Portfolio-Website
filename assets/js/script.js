// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
    setupThemeSwitcher();
    setupNavigation();
    setupTypingAnimation();
    setupGreetingPopup(); 
});

// Greeting Popup Logic
function setupGreetingPopup() {
    const popup = document.getElementById('greetingPopup');
    const closeButtons = document.querySelectorAll('.close-greeting-btn'); 
    
    // Check if the popup element exists
    if (!popup){
       return;
    }  

    //Show the popup after a brief delay for a smoother load experience (500ms)
    setTimeout(() => {
        popup.classList.add('visible');
    }, 500); 

    // Add listener to ALL close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            popup.classList.remove('visible');
        });
    });

    // Optional: Allow closing by clicking the semi-transparent background (outside the card)
    popup.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.classList.remove('visible');
        }
    });
}


// Theme Switcher with Persistence
function setupThemeSwitcher() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    let isDarkMode = true;
    
    if (storedTheme) {
        // Use stored preference if available
        isDarkMode = storedTheme === 'dark';
    } else if (prefersDark) {
        // Use system preference if no stored preference
        isDarkMode = true;
    } 
    // Otherwise, the default is dark mode (isDarkMode = true)

    // Apply initial state
    if (isDarkMode) {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
    themeToggle.checked = isDarkMode;

    // Add change listener
    themeToggle.addEventListener('change', () => {
        const isChecked = themeToggle.checked;
        body.classList.toggle('dark-mode', isChecked);
        
        // Store the new preference
        localStorage.setItem('theme', isChecked ? 'dark' : 'light');
    });
}

// Mobile Nav Toggle and Scrolling Fix
function setupNavigation() {
    const navToggle = document.getElementById('navToggle');
    const siteNav = document.getElementById('siteNav');
    const navLinks = siteNav.querySelectorAll('a');

    // Toggle logic
    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
        
        siteNav.classList.toggle('active'); 
        
        navToggle.setAttribute('aria-expanded', !isExpanded);
        
        // lock body scroll when nav is open
        document.body.classList.toggle('nav-open', siteNav.classList.contains('active'));
    });

    // Close nav when a link is clicked 
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            
            siteNav.classList.remove('active'); 
            
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('nav-open');
        });
    });
}

//Typing Animation with Smoother Logic
function setupTypingAnimation() {
    const typedText = document.getElementById('typed');

    if (!typedText){
      return; 
    } 
    
    const texts = ["Java Full Stack Developer", "AI/ML Enthusiast", "AI & Data Science Engineer"];
    let idx = 0;
    let char = 0;
    let isDeleting = false;

    typedText.classList.add('typing-effect'); 

    function type() {
        const current = texts[idx];
        
        let speed = 100; 
        
        if (isDeleting) {
            speed = 50; // Faster deletion
            char--;
        } else {
            char++;
        }

        typedText.textContent = current.substring(0, char);
        
        // State switching logic
        if (!isDeleting && char === current.length) {
            // Pause at the end of the word
            isDeleting = true;
            speed = 1500; 
        } else if (isDeleting && char < 0) {
            // Pause before starting the next word
            isDeleting = false;
            idx = (idx + 1) % texts.length;
            speed = 500; 
        }
        
        setTimeout(type, speed);
    }
    
    // Start typing animation
    setTimeout(type, 500); 
}
