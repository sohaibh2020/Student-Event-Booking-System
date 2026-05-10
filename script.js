// ============================================
// STUDENT EVENT BOOKING SYSTEM - JAVASCRIPT
// ============================================

// Initialize the system when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeSystem();
    checkUserSession();
    loadPageContent();
});

// ============================================
// INITIALIZATION FUNCTIONS
// ============================================

// Initialize the system with default events and data
function initializeSystem() {
    // Check if system is already initialized
    if (!localStorage.getItem('systemInitialized')) {
        // Create default events
        const defaultEvents = [
            {
                id: 1,
                name: 'Web Development Workshop',
                date: '2026-05-20',
                time: '10:00',
                location: 'Building A, Room 101',
                capacity: 50,
                enrolled: 32,
                category: 'Workshop',
                description: 'Learn modern web development with HTML, CSS, and JavaScript. Perfect for beginners!'
            },
            {
                id: 2,
                name: 'Sports Day',
                date: '2026-05-25',
                time: '14:00',
                location: 'Sports Ground',
                capacity: 200,
                enrolled: 120,
                category: 'Sports',
                description: 'Join us for an exciting day of sports activities including cricket, football, and more!'
            },
            {
                id: 3,
                name: 'Career Fair 2026',
                date: '2026-06-01',
                time: '09:00',
                location: 'Convention Center',
                capacity: 500,
                enrolled: 380,
                category: 'Career',
                description: 'Meet top companies and explore career opportunities. Bring your resume!'
            },
            {
                id: 4,
                name: 'Coding Competition',
                date: '2026-06-10',
                time: '13:00',
                location: 'Computer Lab, Building C',
                capacity: 100,
                enrolled: 85,
                category: 'Competition',
                description: 'Showcase your coding skills. Compete for prizes and recognition!'
            },
            {
                id: 5,
                name: 'Freshers Welcome Party',
                date: '2026-06-05',
                time: '18:00',
                location: 'Student Union Hall',
                capacity: 300,
                enrolled: 150,
                category: 'Social',
                description: 'Welcome new students! Enjoy games, food, and meet your peers!'
            }
        ];

        // Save default events to localStorage
        localStorage.setItem('events', JSON.stringify(defaultEvents));
        localStorage.setItem('systemInitialized', 'true');
    }
}

// Check if user has an active session
function checkUserSession() {
    const currentUser = localStorage.getItem('currentUser');
    const currentAdmin = localStorage.getItem('currentAdmin');
    
    // Update navigation based on login status
    const bookingsLink = document.getElementById('bookings-link');
    const logoutBtn = document.getElementById('logout-btn');
    const userInfo = document.getElementById('user-info');
    const userName = document.getElementById('user-name');

    if (bookingsLink && logoutBtn) {
        if (currentUser) {
            bookingsLink.style.display = 'block';
            logoutBtn.style.display = 'block';
            userInfo.style.display = 'block';
            if (userName) userName.textContent = currentUser;
        } else {
            bookingsLink.style.display = 'none';
            logoutBtn.style.display = 'none';
            userInfo.style.display = 'none';
        }
    }
}

// Load page-specific content
function loadPageContent() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    if (currentPage === 'events.html') {
        displayEvents();
    } else if (currentPage === 'bookings.html') {
        if (!localStorage.getItem('currentUser')) {
            window.location.href = 'login.html';
            return;
        }
        displayMyBookings();
    } else if (currentPage === 'admin.html') {
        if (localStorage.getItem('currentAdmin')) {
            showAdminDashboard();
        } else {
            showAdminLogin();
        }
    }
}

// ============================================
// STUDENT REGISTRATION & LOGIN
// ============================================

// Handle student registration
function registerStudent(event) {
    event.preventDefault();

    const fullname = document.getElementById('fullname').value;
    const studentid = document.getElementById('studentid').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const phone = document.getElementById('phone').value;

    // Validate input
    if (password !== confirmPassword) {
        showMessage('Passwords do not match!', 'error');
        return;
    }

    // Get existing students
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Check if email already exists
    if (students.some(s => s.email === email)) {
        showMessage('Email already registered!', 'error');
        return;
    }

    // Create new student object
    const newStudent = {
        id: Date.now(),
        fullname: fullname,
        studentid: studentid,
        email: email,
        password: password,
        phone: phone,
        registeredAt: new Date().toISOString()
    };

    // Save student
    students.push(newStudent);
    localStorage.setItem('students', JSON.stringify(students));

    // Show success message and redirect
    showMessage('Registration successful! Redirecting to login...', 'success');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}

// Handle student login
function studentLogin(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Get students from localStorage
    const students = JSON.parse(localStorage.getItem('students')) || [];

    // Find student with matching credentials
    const student = students.find(s => s.email === email && s.password === password);

    if (student) {
        // Save current user session
        localStorage.setItem('currentUser', student.fullname);
        localStorage.setItem('currentUserId', student.id);
        showMessage('Login successful! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = 'events.html';
        }, 1500);
    } else {
        showMessage('Invalid email or password!', 'error');
    }
}

// ============================================
// ADMIN LOGIN & FUNCTIONS
// ============================================

// Handle admin login
function adminLogin(event) {
    event.preventDefault();

    const email = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;

    // Admin credentials
    const adminEmail = 'admin@uni.com';
    const adminPassword = 'admin123';

    if (email === adminEmail && password === adminPassword) {
        localStorage.setItem('currentAdmin', 'Admin');
        showMessage('Admin login successful!', 'success');
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    } else {
        showMessage('Invalid admin credentials!', 'error');
    }
}

// Show admin dashboard
function showAdminDashboard() {
    const loginDiv = document.getElementById('admin-login');
    const dashboardDiv = document.getElementById('admin-dashboard');

    if (loginDiv && dashboardDiv) {
        loginDiv.style.display = 'none';
        dashboardDiv.style.display = 'block';
        loadAdminEvents();
        loadAdminBookings();
    }
}

// Show admin login form
function showAdminLogin() {
    const loginDiv = document.getElementById('admin-login');
    const dashboardDiv = document.getElementById('admin-dashboard');

    if (loginDiv && dashboardDiv) {
        loginDiv.style.display = 'block';
        dashboardDiv.style.display = 'none';
    }
}

// Switch between admin tabs
function showAdminTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.style.display = 'none';
    });

    // Remove active class from buttons
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    const tab = document.getElementById(tabName + '-tab');
    if (tab) {
        tab.style.display = 'block';
    }

    // Add active class to clicked button
    event.target.classList.add('active');
}

// Add new event (Admin function)
function addEvent(event) {
    event.preventDefault();

    const name = document.getElementById('event-name').value;
    const date = document.getElementById('event-date').value;
    const time = document.getElementById('event-time').value;
    const location = document.getElementById('event-location').value;
    const capacity = parseInt(document.getElementById('event-capacity').value);
    const category = document.getElementById('event-category').value;
    const description = document.getElementById('event-description').value;

    // Get existing events
    let events = JSON.parse(localStorage.getItem('events')) || [];

    // Create new event
    const newEvent = {
        id: Date.now(),
        name: name,
        date: date,
        time: time,
        location: location,
        capacity: capacity,
        enrolled: 0,
        category: category,
        description: description
    };

    // Add event
    events.push(newEvent);
    localStorage.setItem('events', JSON.stringify(events));

    // Reset form
    document.getElementById('add-event-form').reset();

    // Reload events display
    loadAdminEvents();
    showMessage('Event added successfully!', 'success');
}

// Load and display admin events
function loadAdminEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const eventsList = document.getElementById('admin-events-list');

    if (!eventsList) return;

    eventsList.innerHTML = '';

    events.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.className = 'admin-event-item';
        eventItem.innerHTML = `
            <div>
                <h3>${event.name}</h3>
                <div class="admin-event-details">
                    <div>
                        <div class="admin-event-detail-label">Date & Time:</div>
                        <div class="admin-event-detail-value">${event.date} at ${event.time}</div>
                    </div>
                    <div>
                        <div class="admin-event-detail-label">Location:</div>
                        <div class="admin-event-detail-value">${event.location}</div>
                    </div>
                    <div>
                        <div class="admin-event-detail-label">Capacity:</div>
                        <div class="admin-event-detail-value">${event.enrolled}/${event.capacity}</div>
                    </div>
                    <div>
                        <div class="admin-event-detail-label">Category:</div>
                        <div class="admin-event-detail-value">${event.category}</div>
                    </div>
                </div>
                <div class="admin-event-details">
                    <div style="grid-column: 1 / -1;">
                        <div class="admin-event-detail-label">Description:</div>
                        <div class="admin-event-detail-value">${event.description}</div>
                    </div>
                </div>
            </div>
            <div class="admin-event-actions">
                <button class="btn btn-primary btn-small" onclick="openEditModal(${event.id})">Edit</button>
                <button class="btn btn-danger btn-small" onclick="deleteEvent(${event.id})">Delete</button>
            </div>
        `;
        eventsList.appendChild(eventItem);
    });
}

// Open edit modal
function openEditModal(eventId) {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const event = events.find(e => e.id === eventId);

    if (!event) return;

    // Populate modal with event data
    document.getElementById('edit-event-name').value = event.name;
    document.getElementById('edit-event-date').value = event.date;
    document.getElementById('edit-event-time').value = event.time;
    document.getElementById('edit-event-location').value = event.location;
    document.getElementById('edit-event-capacity').value = event.capacity;
    document.getElementById('edit-event-category').value = event.category;
    document.getElementById('edit-event-description').value = event.description;

    // Store event ID for saving
    document.getElementById('edit-event-form').dataset.eventId = eventId;

    // Show modal
    document.getElementById('edit-modal').style.display = 'flex';
}

// Save event edit
function saveEventEdit(event) {
    event.preventDefault();

    const eventId = parseInt(document.getElementById('edit-event-form').dataset.eventId);
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const eventIndex = events.findIndex(e => e.id === eventId);

    if (eventIndex === -1) return;

    // Update event
    events[eventIndex] = {
        ...events[eventIndex],
        name: document.getElementById('edit-event-name').value,
        date: document.getElementById('edit-event-date').value,
        time: document.getElementById('edit-event-time').value,
        location: document.getElementById('edit-event-location').value,
        capacity: parseInt(document.getElementById('edit-event-capacity').value),
        category: document.getElementById('edit-event-category').value,
        description: document.getElementById('edit-event-description').value
    };

    localStorage.setItem('events', JSON.stringify(events));
    closeEditModal();
    loadAdminEvents();
    showMessage('Event updated successfully!', 'success');
}

// Close edit modal
function closeEditModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

// Delete event
function deleteEvent(eventId) {
    if (confirm('Are you sure you want to delete this event?')) {
        let events = JSON.parse(localStorage.getItem('events')) || [];
        events = events.filter(e => e.id !== eventId);
        localStorage.setItem('events', JSON.stringify(events));
        loadAdminEvents();
        showMessage('Event deleted successfully!', 'success');
    }
}

// Load and display all bookings (Admin view)
function loadAdminBookings() {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const bookingsList = document.getElementById('admin-bookings-list');

    if (!bookingsList) return;

    bookingsList.innerHTML = '';

    if (bookings.length === 0) {
        bookingsList.innerHTML = '<p>No bookings yet.</p>';
        return;
    }

    bookings.forEach(booking => {
        const event = events.find(e => e.id === booking.eventId);
        const student = students.find(s => s.id === booking.studentId);

        if (event && student) {
            const bookingItem = document.createElement('div');
            bookingItem.className = 'admin-booking-item';
            bookingItem.innerHTML = `
                <h3>${event.name}</h3>
                <div class="admin-booking-details">
                    <div>
                        <strong>Student:</strong> ${student.fullname}
                    </div>
                    <div>
                        <strong>Email:</strong> ${student.email}
                    </div>
                    <div>
                        <strong>Student ID:</strong> ${student.studentid}
                    </div>
                    <div>
                        <strong>Event Date:</strong> ${event.date}
                    </div>
                    <div>
                        <strong>Booking Date:</strong> ${new Date(booking.bookingDate).toLocaleDateString()}
                    </div>
                    <div>
                        <strong>Status:</strong> <span class="booking-status ${booking.status}">${booking.status.toUpperCase()}</span>
                    </div>
                </div>
            `;
            bookingsList.appendChild(bookingItem);
        }
    });
}

// ============================================
// EVENT DISPLAY & BOOKING
// ============================================

// Display all events
function displayEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const grid = document.getElementById('events-grid');

    if (!grid) return;

    // Clear grid
    grid.innerHTML = '';

    if (events.length === 0) {
        grid.innerHTML = '<p>No events available.</p>';
        return;
    }

    events.forEach(event => {
        const spacesRemaining = event.capacity - event.enrolled;
        const capacityPercentage = (event.enrolled / event.capacity) * 100;
        const capacityStatus = capacityPercentage >= 90 ? 'critical' : capacityPercentage >= 70 ? 'warning' : '';

        const card = document.createElement('div');
        card.className = 'event-card';
        card.innerHTML = `
            <div class="event-header">
                <span class="event-category">${event.category}</span>
                <h3>${event.name}</h3>
            </div>
            <div class="event-body">
                <div class="event-info">
                    <span class="event-info-icon">📅</span>
                    <span>${event.date} at ${event.time}</span>
                </div>
                <div class="event-info">
                    <span class="event-info-icon">📍</span>
                    <span>${event.location}</span>
                </div>
                <div class="event-description">${event.description}</div>
                <div class="event-capacity">
                    <strong>${spacesRemaining} spaces remaining</strong> (${event.enrolled}/${event.capacity} enrolled)
                    <div class="event-capacity-bar">
                        <div class="event-capacity-fill ${capacityStatus}" style="width: ${capacityPercentage}%"></div>
                    </div>
                </div>
                <div class="event-button-group">
                    <button class="btn btn-primary" onclick="prepareBooking(${event.id})" ${spacesRemaining === 0 ? 'disabled' : ''}>Book Event</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    // Add search functionality
    const searchInput = document.getElementById('search-events');
    if (searchInput) {
        searchInput.addEventListener('keyup', filterEvents);
    }
}

// Filter events by search
function filterEvents() {
    const searchTerm = document.getElementById('search-events').value.toLowerCase();
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const grid = document.getElementById('events-grid');

    grid.innerHTML = '';

    const filtered = events.filter(event => 
        event.name.toLowerCase().includes(searchTerm) ||
        event.category.toLowerCase().includes(searchTerm) ||
        event.location.toLowerCase().includes(searchTerm)
    );

    if (filtered.length === 0) {
        grid.innerHTML = '<p>No events match your search.</p>';
        return;
    }

    filtered.forEach(event => {
        const spacesRemaining = event.capacity - event.enrolled;
        const capacityPercentage = (event.enrolled / event.capacity) * 100;
        const capacityStatus = capacityPercentage >= 90 ? 'critical' : capacityPercentage >= 70 ? 'warning' : '';

        const card = document.createElement('div');
        card.className = 'event-card';
        card.innerHTML = `
            <div class="event-header">
                <span class="event-category">${event.category}</span>
                <h3>${event.name}</h3>
            </div>
            <div class="event-body">
                <div class="event-info">
                    <span class="event-info-icon">📅</span>
                    <span>${event.date} at ${event.time}</span>
                </div>
                <div class="event-info">
                    <span class="event-info-icon">📍</span>
                    <span>${event.location}</span>
                </div>
                <div class="event-description">${event.description}</div>
                <div class="event-capacity">
                    <strong>${spacesRemaining} spaces remaining</strong> (${event.enrolled}/${event.capacity} enrolled)
                    <div class="event-capacity-bar">
                        <div class="event-capacity-fill ${capacityStatus}" style="width: ${capacityPercentage}%"></div>
                    </div>
                </div>
                <div class="event-button-group">
                    <button class="btn btn-primary" onclick="prepareBooking(${event.id})" ${spacesRemaining === 0 ? 'disabled' : ''}>Book Event</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Prepare booking and show modal
function prepareBooking(eventId) {
    const currentUser = localStorage.getItem('currentUser');
    const currentUserId = localStorage.getItem('currentUserId');

    if (!currentUser) {
        showMessage('Please log in first!', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return;
    }

    const events = JSON.parse(localStorage.getItem('events')) || [];
    const event = events.find(e => e.id === eventId);

    if (!event) return;

    // Check if already booked
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const alreadyBooked = bookings.some(b => b.eventId === eventId && b.studentId === parseInt(currentUserId));

    if (alreadyBooked) {
        showMessage('You have already booked this event!', 'error');
        return;
    }

    // Show booking modal
    const modal = document.getElementById('book-modal');
    const content = document.getElementById('book-modal-content');

    content.innerHTML = `
        <div class="event-details">
            <p><strong>Event:</strong> ${event.name}</p>
            <p><strong>Date & Time:</strong> ${event.date} at ${event.time}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Category:</strong> ${event.category}</p>
        </div>
        <p>Are you sure you want to book this event?</p>
        <button class="btn btn-primary btn-block" onclick="confirmBooking(${eventId})">Confirm Booking</button>
        <button class="btn btn-secondary btn-block" onclick="closeBookModal()">Cancel</button>
    `;

    modal.style.display = 'flex';
}

// Confirm event booking
function confirmBooking(eventId) {
    const currentUserId = localStorage.getItem('currentUserId');
    const currentUser = localStorage.getItem('currentUser');

    // Get events and bookings
    let events = JSON.parse(localStorage.getItem('events')) || [];
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    // Find event
    const eventIndex = events.findIndex(e => e.id === eventId);
    if (eventIndex === -1) return;

    // Check if space available
    if (events[eventIndex].enrolled >= events[eventIndex].capacity) {
        showMessage('No spaces available for this event!', 'error');
        return;
    }

    // Update event enrolled count
    events[eventIndex].enrolled += 1;
    localStorage.setItem('events', JSON.stringify(events));

    // Create booking record
    const booking = {
        id: Date.now(),
        eventId: eventId,
        studentId: parseInt(currentUserId),
        studentName: currentUser,
        bookingDate: new Date().toISOString(),
        status: 'confirmed'
    };

    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    // Close modal and show success
    closeBookModal();
    showMessage('Event booked successfully!', 'success');
    setTimeout(() => {
        displayEvents();
    }, 1500);
}

// Close book modal
function closeBookModal() {
    document.getElementById('book-modal').style.display = 'none';
}

// ============================================
// MY BOOKINGS
// ============================================

// Display user's bookings
function displayMyBookings() {
    const currentUserId = localStorage.getItem('currentUserId');
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const list = document.getElementById('bookings-list');
    const empty = document.getElementById('empty-bookings');

    // Filter bookings for current user
    const userBookings = bookings.filter(b => b.studentId === parseInt(currentUserId));

    if (userBookings.length === 0) {
        list.style.display = 'none';
        empty.style.display = 'block';
        return;
    }

    list.style.display = 'block';
    empty.style.display = 'none';
    list.innerHTML = '';

    userBookings.forEach(booking => {
        const event = events.find(e => e.id === booking.eventId);

        if (event) {
            const card = document.createElement('div');
            card.className = 'booking-card';
            card.innerHTML = `
                <h3>${event.name}</h3>
                <div class="booking-info">
                    <div class="booking-detail">
                        <strong>Date & Time:</strong>
                        <p>${event.date} at ${event.time}</p>
                    </div>
                    <div class="booking-detail">
                        <strong>Location:</strong>
                        <p>${event.location}</p>
                    </div>
                    <div class="booking-detail">
                        <strong>Category:</strong>
                        <p>${event.category}</p>
                    </div>
                    <div class="booking-detail">
                        <strong>Booked on:</strong>
                        <p>${new Date(booking.bookingDate).toLocaleDateString()}</p>
                    </div>
                </div>
                <span class="booking-status ${booking.status}">${booking.status.toUpperCase()}</span>
                <div class="booking-actions">
                    ${booking.status === 'confirmed' ? `<button class="btn btn-danger" onclick="cancelBooking(${booking.id})">Cancel Booking</button>` : ''}
                </div>
            `;
            list.appendChild(card);
        }
    });
}

// Cancel booking
function cancelBooking(bookingId) {
    if (confirm('Are you sure you want to cancel this booking?')) {
        let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        let events = JSON.parse(localStorage.getItem('events')) || [];

        const booking = bookings.find(b => b.id === bookingId);
        if (!booking) return;

        // Update event enrolled count
        const eventIndex = events.findIndex(e => e.id === booking.eventId);
        if (eventIndex !== -1) {
            events[eventIndex].enrolled -= 1;
            localStorage.setItem('events', JSON.stringify(events));
        }

        // Update booking status
        const bookingIndex = bookings.findIndex(b => b.id === bookingId);
        if (bookingIndex !== -1) {
            bookings[bookingIndex].status = 'cancelled';
            localStorage.setItem('bookings', JSON.stringify(bookings));
        }

        showMessage('Booking cancelled successfully!', 'success');
        setTimeout(() => {
            displayMyBookings();
        }, 1500);
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Logout user
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserId');
    showMessage('Logged out successfully!', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Logout admin
function adminLogout() {
    localStorage.removeItem('currentAdmin');
    showMessage('Admin logged out!', 'success');
    setTimeout(() => {
        window.location.href = 'admin.html';
    }, 1000);
}

// Show message to user
function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    if (!messageDiv) return;

    messageDiv.textContent = message;
    messageDiv.className = 'message ' + type;
    messageDiv.style.display = 'block';

    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Close modals when clicking outside
window.onclick = function(event) {
    const bookModal = document.getElementById('book-modal');
    const editModal = document.getElementById('edit-modal');

    if (event.target === bookModal) {
        bookModal.style.display = 'none';
    }
    if (event.target === editModal) {
        editModal.style.display = 'none';
    }
};