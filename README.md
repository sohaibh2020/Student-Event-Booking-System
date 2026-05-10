# Student Event Booking System

A complete web-based event booking system designed for university students. Built with HTML, CSS, and JavaScript using browser localStorage as the database.

## Features

### Student Features
- **User Registration**: Create a new account with email, password, student ID, and contact details
- **User Login**: Secure login to access booking features
- **Browse Events**: View all available events with detailed information
- **Event Search**: Filter events by name, category, or location
- **Event Details**: See event information including date, time, location, capacity, and available spaces
- **Book Events**: Reserve a spot at your favorite events
- **Manage Bookings**: View your booked events and cancel if needed
- **Capacity Tracking**: See how many spaces are remaining for each event with visual indicators

### Admin Features
- **Admin Login**: Secure access to admin panel with predefined credentials
- **Add Events**: Create new events with all necessary details
- **Edit Events**: Modify event information
- **Delete Events**: Remove events from the system
- **View All Bookings**: See all student bookings across all events
- **Event Management Dashboard**: Comprehensive view of all system events

## Technologies Used

- **HTML5**: Semantic markup and page structure
- **CSS3**: Modern styling with flexbox and grid layouts
- **JavaScript (ES6)**: Dynamic functionality and data management
- **localStorage API**: Client-side data persistence

## File Structure

```
student-event-booking-system/
├── index.html           # Landing page with features overview
├── register.html        # Student registration form
├── login.html           # Student login form
├── events.html          # Browse and search events
├── bookings.html        # View and manage bookings
├── admin.html           # Admin login and management panel
├── style.css            # All styling (responsive design)
├── script.js            # All JavaScript functionality
└── README.md            # This file
```

## How to Run

1. **Clone or Download** the project files
2. **Open the project** in a web browser by double-clicking `index.html` or serving it through a local server
3. **No installation required** - everything runs in the browser!

Optional: For development, you can use any local server like:
```bash
python -m http.server 8000
# or
npx http-server
```

Then open `http://localhost:8000` in your browser.

## Admin Login Details

- **Email**: `admin@uni.com`
- **Password**: `admin123`

## Sample Events

The system comes with 5 pre-loaded sample events:

1. **Web Development Workshop**
   - Date: 2026-05-20 at 10:00
   - Location: Building A, Room 101
   - Capacity: 50 students

2. **Sports Day**
   - Date: 2026-05-25 at 14:00
   - Location: Sports Ground
   - Capacity: 200 students

3. **Career Fair 2026**
   - Date: 2026-06-01 at 09:00
   - Location: Convention Center
   - Capacity: 500 students

4. **Coding Competition**
   - Date: 2026-06-10 at 13:00
   - Location: Computer Lab, Building C
   - Capacity: 100 students

5. **Freshers Welcome Party**
   - Date: 2026-06-05 at 18:00
   - Location: Student Union Hall
   - Capacity: 300 students

## Usage Guide

### For Students

1. **Register**: Click "Register as Student" and fill in your details
2. **Login**: Use your email and password to log in
3. **Browse Events**: View all available events on the Events page
4. **Search**: Use the search bar to find specific events
5. **Book**: Click "Book Event" to reserve your spot
6. **Manage**: Go to "My Bookings" to view or cancel bookings

### For Admin

1. **Login**: Go to Admin section and use the provided credentials
2. **Add Events**: Fill in the form to create new events
3. **Edit Events**: Click Edit on any event to modify details
4. **Delete Events**: Click Delete to remove events
5. **View Bookings**: Switch to "View Bookings" tab to see all student registrations

## Features Explained

### Capacity Management
- Each event has a limited capacity
- The system tracks enrolled students vs. total capacity
- Visual progress bar shows how full an event is
- Color indicators: Green (plenty of space), Orange (filling up), Red (almost full)
- When capacity is full, the "Book Event" button becomes disabled

### Data Persistence
- All data is stored in browser's localStorage
- Data persists between sessions
- Each browser has its own separate database

### Input Validation
- Email validation for registration and login
- Password confirmation on registration
- Duplicate email prevention
- Required field validation
- Capacity validation (minimum 1)

## Browser Compatibility

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Opera (Latest)

## Responsive Design

- Fully responsive layout
- Works on desktop, tablet, and mobile devices
- Touch-friendly buttons and inputs
- Optimized grid layouts for all screen sizes

## Data Storage

The system stores the following in localStorage:
- `students`: Array of registered student accounts
- `events`: Array of all events
- `bookings`: Array of all bookings
- `currentUser`: Currently logged-in student
- `currentUserId`: ID of currently logged-in student
- `currentAdmin`: Admin login status
- `systemInitialized`: Initialization flag

## Limitations & Notes

- Data is stored locally in the browser only
- Clearing browser cache will delete all data
- Different browsers maintain separate databases
- No email verification (sample system)
- No real payment processing

## Future Enhancement Ideas

- Backend database integration
- Email notifications for confirmations
- Event ratings and reviews
- Waitlist functionality
- PDF ticket generation
- Calendar view for events
- Dark mode theme
- Multi-language support

## License

This project is free to use for educational purposes.

## Support

For issues or questions, please review the code comments which explain each section in detail.

---

**Created**: May 2026
**Version**: 1.0
**Status**: Complete and ready for use