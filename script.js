// State management
let currentPage = 'home';
let activeCard = null;
let isDarkMode = false;

// Theme toggle functionality
document.getElementById('themeToggle').addEventListener('click', function() {
    isDarkMode = !isDarkMode;
    const theme = isDarkMode ? 'dark' : 'light';
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('topik-theme', theme);
    
    // Add ripple effect to theme toggle
    createRippleEffect(event);
});

// Initialize theme from localStorage
function initializeTheme() {
    const savedTheme = localStorage.getItem('topik-theme');
    if (savedTheme) {
        isDarkMode = savedTheme === 'dark';
        document.body.setAttribute('data-theme', savedTheme);
    }
}

// Create ripple effect on click
function createRippleEffect(event) {
    const ripple = document.createElement('div');
    ripple.classList.add('click-animation');
    
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    event.currentTarget.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Set active navigation button
function setActiveNavButton(buttonId) {
    // Remove active class from all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    const buttonMap = {
        'homeBtn': document.getElementById('homeBtn'),
        'topikWritingBtn': document.getElementById('topikWritingBtn'),
        'day01Btn': document.getElementById('day01Btn'),
        'day02Btn': document.getElementById('day02Btn'),
        'day03Btn': document.getElementById('day03Btn')
    };
    
    if (buttonMap[buttonId]) {
        buttonMap[buttonId].classList.add('active');
    }
}

// Set active card with visual feedback
function setActiveCard(cardElement) {
    // Remove active class from previously active card
    if (activeCard) {
        activeCard.classList.remove('active');
    }
    
    // Set new active card
    activeCard = cardElement;
    if (activeCard) {
        activeCard.classList.add('active');
        
        // Remove active class after animation completes
        setTimeout(() => {
            if (activeCard) {
                activeCard.classList.remove('active');
                activeCard = null;
            }
        }, 1000);
    }
}

// Show home page
function showHome(event) {
    if (currentPage === 'home') return;
    
    if (event) createRippleEffect(event);
    currentPage = 'home';
    setActiveNavButton('homeBtn');
    updateBrowserHistory('home', 'TOPIK Quiz Portal - Home');
    
    document.getElementById('contentArea').innerHTML = `
        <div class="content-header">
            <div class="content-title">
                <i class="fas fa-home"></i> Welcome to TOPIK Quiz Portal
            </div>
        </div>
        <div class="content-body">
            <div class="home-content">
                <h2 class="welcome-title">Start Your Korean Learning Journey</h2>
                <p class="welcome-text">
                    This portal provides direct access to TOPIK (Test of Proficiency in Korean) preparation resources. 
                    All content loads within this page, allowing you to use browser navigation (back/forward buttons) 
                    for a seamless learning experience.
                </p>
                
                <div class="feature-cards">
                    <div class="feature-card" onclick="showTopikWriting(event)" id="topikWritingCard">
                        <div class="feature-icon">
                            <i class="fas fa-pen-fancy"></i>
                        </div>
                        <h3 class="feature-title">TOPIK Writing</h3>
                        <p class="feature-desc">
                            Practice your Korean writing skills with guided exercises and sample questions 
                            specifically designed for the TOPIK exam format.
                        </p>
                    </div>
                    
                    <div class="feature-card day-01-card" onclick="showDay01(event)" id="day01Card">
                        <div class="feature-icon">
                            <i class="fas fa-calendar-day"></i>
                        </div>
                        <h3 class="feature-title">Day 01 Exercises</h3>
                        <p class="feature-desc">
                            Begin your TOPIK preparation with foundational exercises designed for 
                            Day 1 of your study plan. Perfect for beginners.
                        </p>
                    </div>
                    
                    <div class="feature-card day-02-card" onclick="showDay02(event)" id="day02Card">
                        <div class="feature-icon">
                            <i class="fas fa-calendar-day"></i>
                        </div>
                        <h3 class="feature-title">Day 02 Exercises</h3>
                        <p class="feature-desc">
                            Continue your TOPIK journey with intermediate exercises designed for 
                            Day 2 of your study plan. Build upon your foundation.
                        </p>
                    </div>
                    
                    <div class="feature-card day-03-card" onclick="showDay03(event)" id="day03Card">
                        <div class="feature-icon">
                            <i class="fas fa-calendar-day"></i>
                        </div>
                        <h3 class="feature-title">Day 03 Exercises</h3>
                        <p class="feature-desc">
                            Advance your TOPIK preparation with challenging exercises designed for 
                            Day 3 of your study plan. For intermediate learners.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add fade-in animation
    document.getElementById('contentArea').classList.remove('fade-in');
    void document.getElementById('contentArea').offsetWidth;
    document.getElementById('contentArea').classList.add('fade-in');
}

// Show TOPIK Writing page
function showTopikWriting(event) {
    if (currentPage === 'topik-writing') return;
    
    if (event) createRippleEffect(event);
    currentPage = 'topik-writing';
    setActiveNavButton('topikWritingBtn');
    updateBrowserHistory('topik-writing', 'TOPIK Quiz Portal - Writing Practice');
    
    document.getElementById('contentArea').innerHTML = `
        <div class="content-header writing">
            <div class="content-title">
                <i class="fas fa-pen-fancy"></i> TOPIK Writing Practice
            </div>
        </div>
        <div class="content-body">
            <a href="#" class="back-link" onclick="showHome(event); return false;">
                <i class="fas fa-arrow-left"></i> Back to Home
            </a>
            
            <div class="resource-list">
                <div class="resource-item topik-writing-item" onclick="loadTopikWriting(event)" id="topikWritingResource">
                    <div class="resource-link topik-writing-link">
                        <i class="fas fa-external-link-alt"></i>
                        <div>
                            <div class="resource-text">TOPIK Writing Practice</div>
                            <div class="url-preview">https://nemsothea.github.io/topikquiz/writing.html</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <p style="margin-bottom: 1.5rem; color: var(--text-secondary); font-size: 0.95rem;">
                <i class="fas fa-lightbulb" style="color: #4CAF50; margin-right: 8px;"></i>
                Click the resource above to load the TOPIK Writing practice page. This resource helps you practice Korean writing for the TOPIK exam with sample questions and format guidance.
            </p>
            
            <div id="iframeContainer">
                <div class="loading" id="loadingIndicator">
                    <div class="spinner"></div>
                    <p>Click on the resource card above to load the content</p>
                </div>
            </div>
        </div>
    `;
    
    // Add fade-in animation
    document.getElementById('contentArea').classList.remove('fade-in');
    void document.getElementById('contentArea').offsetWidth;
    document.getElementById('contentArea').classList.add('fade-in');
}

// Load TOPIK Writing iframe
function loadTopikWriting(event) {
    if (event) {
        createRippleEffect(event);
        setActiveCard(document.getElementById('topikWritingResource'));
    }
    
    const iframeContainer = document.getElementById('iframeContainer');
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    // Show loading indicator
    loadingIndicator.innerHTML = `
        <div class="spinner"></div>
        <p>Loading TOPIK Writing content...</p>
    `;
    
    // Create iframe
    setTimeout(() => {
        iframeContainer.innerHTML = `
            <iframe 
                src="https://nemsothea.github.io/topikquiz/writing.html" 
                class="content-frame" 
                title="TOPIK Writing Practice"
                onload="document.getElementById('loadingIndicator').style.display='none'">
            </iframe>
        `;
    }, 500);
}

// Show Day 01 page
function showDay01(event) {
    if (currentPage === 'day-01') return;
    
    if (event) createRippleEffect(event);
    currentPage = 'day-01';
    setActiveNavButton('day01Btn');
    updateBrowserHistory('day-01', 'TOPIK Quiz Portal - Day 01');
    
    document.getElementById('contentArea').innerHTML = `
        <div class="content-header day-01">
            <div class="content-title">
                <i class="fas fa-calendar-day"></i> Day 01 Exercises
            </div>
        </div>
        <div class="content-body">
            <a href="#" class="back-link" onclick="showHome(event); return false;">
                <i class="fas fa-arrow-left"></i> Back to Home
            </a>
            
            <div class="resource-list">
                <div class="resource-item day-01-item" onclick="loadDay01(event)" id="day01Resource">
                    <div class="resource-link day-01-link">
                        <i class="fas fa-external-link-alt"></i>
                        <div>
                            <div class="resource-text">Day 01 Practice Material</div>
                            <div class="url-preview">https://nemsothea.github.io/topikquiz/day01.html</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <p style="margin-bottom: 1.5rem; color: var(--text-secondary); font-size: 0.95rem;">
                <i class="fas fa-lightbulb" style="color: #FF9800; margin-right: 8px;"></i>
                Click the resource above to load the Day 01 practice page. Begin your TOPIK journey with these foundational exercises designed for Day 1 of your study plan.
            </p>
            
            <div id="iframeContainer">
                <div class="loading" id="loadingIndicator">
                    <div class="spinner"></div>
                    <p>Click on the resource card above to load the content</p>
                </div>
            </div>
        </div>
    `;
    
    // Add fade-in animation
    document.getElementById('contentArea').classList.remove('fade-in');
    void document.getElementById('contentArea').offsetWidth;
    document.getElementById('contentArea').classList.add('fade-in');
}

// Load Day 01 iframe
function loadDay01(event) {
    if (event) {
        createRippleEffect(event);
        setActiveCard(document.getElementById('day01Resource'));
    }
    
    const iframeContainer = document.getElementById('iframeContainer');
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    // Show loading indicator
    loadingIndicator.innerHTML = `
        <div class="spinner"></div>
        <p>Loading Day 01 content...</p>
    `;
    
    // Create iframe
    setTimeout(() => {
        iframeContainer.innerHTML = `
            <iframe 
                src="https://nemsothea.github.io/topikquiz/day01.html" 
                class="content-frame" 
                title="Day 01 Exercises"
                onload="document.getElementById('loadingIndicator').style.display='none'">
            </iframe>
        `;
    }, 500);
}

// Show Day 02 page
function showDay02(event) {
    if (currentPage === 'day-02') return;
    
    if (event) createRippleEffect(event);
    currentPage = 'day-02';
    setActiveNavButton('day02Btn');
    updateBrowserHistory('day-02', 'TOPIK Quiz Portal - Day 02');
    
    document.getElementById('contentArea').innerHTML = `
        <div class="content-header day-02">
            <div class="content-title">
                <i class="fas fa-calendar-day"></i> Day 02 Exercises
            </div>
        </div>
        <div class="content-body">
            <a href="#" class="back-link" onclick="showHome(event); return false;">
                <i class="fas fa-arrow-left"></i> Back to Home
            </a>
            
            <div class="resource-list">
                <div class="resource-item day-02-item" onclick="loadDay02(event)" id="day02Resource">
                    <div class="resource-link day-02-link">
                        <i class="fas fa-external-link-alt"></i>
                        <div>
                            <div class="resource-text">Day 02 Practice Material</div>
                            <div class="url-preview">https://nemsothea.github.io/topikquiz/day02.html</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <p style="margin-bottom: 1.5rem; color: var(--text-secondary); font-size: 0.95rem;">
                <i class="fas fa-lightbulb" style="color: #9C27B0; margin-right: 8px;"></i>
                Click the resource above to load the Day 02 practice page. Continue your TOPIK journey with these intermediate exercises designed for Day 2 of your study plan.
            </p>
            
            <div id="iframeContainer">
                <div class="loading" id="loadingIndicator">
                    <div class="spinner"></div>
                    <p>Click on the resource card above to load the content</p>
                </div>
            </div>
        </div>
    `;
    
    // Add fade-in animation
    document.getElementById('contentArea').classList.remove('fade-in');
    void document.getElementById('contentArea').offsetWidth;
    document.getElementById('contentArea').classList.add('fade-in');
}

// Load Day 02 iframe
function loadDay02(event) {
    if (event) {
        createRippleEffect(event);
        setActiveCard(document.getElementById('day02Resource'));
    }
    
    const iframeContainer = document.getElementById('iframeContainer');
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    // Show loading indicator
    loadingIndicator.innerHTML = `
        <div class="spinner"></div>
        <p>Loading Day 02 content...</p>
    `;
    
    // Create iframe
    setTimeout(() => {
        iframeContainer.innerHTML = `
            <iframe 
                src="https://nemsothea.github.io/topikquiz/day02.html" 
                class="content-frame" 
                title="Day 02 Exercises"
                onload="document.getElementById('loadingIndicator').style.display='none'">
            </iframe>
        `;
    }, 500);
}

// Show Day 03 page
function showDay03(event) {
    if (currentPage === 'day-03') return;
    
    if (event) createRippleEffect(event);
    currentPage = 'day-03';
    setActiveNavButton('day03Btn');
    updateBrowserHistory('day-03', 'TOPIK Quiz Portal - Day 03');
    
    document.getElementById('contentArea').innerHTML = `
        <div class="content-header day-03">
            <div class="content-title">
                <i class="fas fa-calendar-day"></i> Day 03 Exercises
            </div>
        </div>
        <div class="content-body">
            <a href="#" class="back-link" onclick="showHome(event); return false;">
                <i class="fas fa-arrow-left"></i> Back to Home
            </a>
            
            <div class="resource-list">
                <div class="resource-item day-03-item" onclick="loadDay03(event)" id="day03Resource">
                    <div class="resource-link day-03-link">
                        <i class="fas fa-external-link-alt"></i>
                        <div>
                            <div class="resource-text">Day 03 Practice Material</div>
                            <div class="url-preview">https://nemsothea.github.io/topikquiz/day03.html</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <p style="margin-bottom: 1.5rem; color: var(--text-secondary); font-size: 0.95rem;">
                <i class="fas fa-lightbulb" style="color: #009688; margin-right: 8px;"></i>
                Click the resource above to load the Day 03 practice page. Advance your TOPIK preparation with these challenging exercises designed for Day 3 of your study plan.
            </p>
            
            <div id="iframeContainer">
                <div class="loading" id="loadingIndicator">
                    <div class="spinner"></div>
                    <p>Click on the resource card above to load the content</p>
                </div>
            </div>
        </div>
    `;
    
    // Add fade-in animation
    document.getElementById('contentArea').classList.remove('fade-in');
    void document.getElementById('contentArea').offsetWidth;
    document.getElementById('contentArea').classList.add('fade-in');
}

// Load Day 03 iframe
function loadDay03(event) {
    if (event) {
        createRippleEffect(event);
        setActiveCard(document.getElementById('day03Resource'));
    }
    
    const iframeContainer = document.getElementById('iframeContainer');
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    // Show loading indicator
    loadingIndicator.innerHTML = `
        <div class="spinner"></div>
        <p>Loading Day 03 content...</p>
    `;
    
    // Create iframe
    setTimeout(() => {
        iframeContainer.innerHTML = `
            <iframe 
                src="https://nemsothea.github.io/topikquiz/day03.html" 
                class="content-frame" 
                title="Day 03 Exercises"
                onload="document.getElementById('loadingIndicator').style.display='none'">
            </iframe>
        `;
    }, 500);
}

// Update browser history for back/forward navigation
function updateBrowserHistory(page, title) {
    const state = { page: page };
    const url = `?page=${page}`;
    
    history.pushState(state, title, url);
    document.title = title;
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.page) {
        const page = event.state.page;
        
        if (page === 'home') {
            showHome();
        } else if (page === 'topik-writing') {
            showTopikWriting();
        } else if (page === 'day-01') {
            showDay01();
        } else if (page === 'day-02') {
            showDay02();
        } else if (page === 'day-03') {
            showDay03();
        }
    } else {
        showHome();
    }
});

// Initialize the page
window.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    
    // Check URL for page parameter
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');
    
    if (page === 'topik-writing') {
        showTopikWriting();
    } else if (page === 'day-01') {
        showDay01();
    } else if (page === 'day-02') {
        showDay02();
    } else if (page === 'day-03') {
        showDay03();
    } else {
        // Set initial history state
        history.replaceState({ page: 'home' }, 'TOPIK Quiz Portal - Home', '?page=home');
    }
    
    // Add click effect to all buttons and cards
    document.addEventListener('click', function(event) {
        if (event.target.closest('.nav-btn') || 
            event.target.closest('.feature-card') || 
            event.target.closest('.resource-item')) {
            createRippleEffect(event);
        }
    });
});