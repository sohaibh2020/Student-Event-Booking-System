/* ============================================
   GENERAL UTILITY FUNCTIONS
   ============================================ */

/**
 * Update navbar based on user login status
 * Shows login/register links if not logged in
 * Shows user name and logout link if logged in
 */
function updateNavbar() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const navUserSection = document.getElementById('nav-user-section');
    const navUserMenu = document.getElementById('nav-user-menu');

    if (!currentUser) {
        // User not logged in - show login/register links
        if (navUserSection) {
            navUserSection.innerHTML = `
                <a href="login.html">Login</a>
                <a href="register.html">Register</a>
            `;
        }
        if (navUserMenu) {
            navUserMenu.style.display = 'none';
        }
    } else {
        // User logged in - show user menu
        if (navUserSection) {
            navUserSection.style.display = 'none';
        }
        if (navUserMenu) {
            navUserMenu.style.display = 'flex';
            const userNameSpan = document.getElementById('userName');
            if (userNameSpan && currentUser.fullName) {
                userNameSpan.textContent = 'Welcome, ' + currentUser.fullName;
            }
        }
    }
}

/**
 * Logout function - clears user session and redirects to home
 */
function logout(event) {
    event.preventDefault();
    localStorage.removeItem('currentUser');
    alert('Logged out successfully!');
    window.location.href = 'index.html';
}

/**
 * Initialize localStorage with sample data on first load
 */
function initializeApp() {
    // Check if this is first time user
    if (!localStorage.getItem('initialized')) {
        // Initialize sample events
        const sampleEvents = [
            {
                id: 'event1',
                name: 'Career Fair 2026',
                category: 'Career',
                date: '2026-06-15',
                time: '10:00',
                location: 'Main Hall',
                capacity: 100,
                booked: 0,
                description: 'Meet with top companies hiring graduates. Network with recruiters and explore job opportunities.'
            },
            {
                id: 'event2',
                name: 'Web Development Workshop',
                category: 'Workshop',
                date: '2026-05-20',
                time: '14:00',
                location: 'Computer Lab A',
                capacity: 40,
                booked: 0,
                description: 'Learn modern web development with React and Node.js. Hands-on session for beginners and intermediate learners.'
            },
            {
                id: 'event3',
                name: 'Guest Lecture: Innovation in Tech',
                category: 'Seminar',
                date: '2026-05-25',
                time: '16:00',
                location: 'Auditorium',
                capacity: 200,
                booked: 0,
                description: 'Industry expert speaking about the latest innovations in technology and their impact on careers.'
            },
            {
                id: 'event4',
                name: 'Sports Day',
                category: 'Sports',
                date: '2026-06-01',
                time: '09:00',
                location: 'Sports Ground',
                capacity: 150,
                booked: 0,
                description: 'Annual sports competition featuring various games and activities. Team participation encouraged!'
            },
            {
                id: 'event5',
                name: 'Python for Data Science',
                category: 'Workshop',
                date: '2026-05-28',
                time: '15:00',
                location: 'Computer Lab B',
                capacity: 50,
                booked: 0,
                description: 'Introduction to Python programming and data analysis libraries. Perfect for beginners in data science.'
            }
        ];

        // Only initialize if not already present
        if (!localStorage.getItem('events')) {
            localStorage.setItem('events', JSON.stringify(sampleEvents));
        }
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify([]));
        }
        if (!localStorage.getItem('bookings')) {
            localStorage.setItem('bookings', JSON.stringify([]));
        }

        // Mark as initialized
        localStorage.setItem('initialized', 'true');
    }
}

// Initialize app when script loads
initializeApp();