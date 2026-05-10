# Student Event Booking System

A simple and user-friendly web application for university students to discover, register for, and manage event bookings. Built with HTML, CSS, and JavaScript with browser localStorage as the database.

## Features

### Student Features
- **User Registration**: Students can create accounts with their details (name, email, student ID, department)
- **User Login**: Secure login system with email and password validation
- **Browse Events**: View all available events with details (date, time, location, capacity, description)
- **Search & Filter**: Search events by name or category
- **Book Events**: Reserve spots at events with real-time capacity tracking
- **View Bookings**: See all personal bookings in a table format
- **Cancel Bookings**: Cancel bookings and free up spots for other students
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Admin Features
- **Admin Dashboard**: Dedicated admin panel for event management
- **Add Events**: Create new events with all details and capacity information
- **Edit Events**: Update existing event details
- **Delete Events**: Remove events and automatically cancel related bookings
- **View All Bookings**: See comprehensive list of all student bookings
- **Event Management**: Full control over event creation, modification, and deletion

## Technologies Used

- **HTML5**: Semantic markup and form structure
- **CSS3**: Responsive design, Flexbox, Grid layout
- **JavaScript (ES6)**: DOM manipulation, event handling, localStorage API
- **localStorage**: Browser-based data persistence (no backend required)

## Project Structure

```
Student-Event-Booking-System/
├── index.html          # Landing page with features overview
├── register.html       # Student registration form
├── login.html          # Login page for students and admin
├── events.html         # Browse and book events
├── bookings.html       # View and cancel personal bookings
├── admin.html          # Admin dashboard for event management
├── style.css           # All styling and responsive design
├── script.js           # Shared utility functions
└── README.md           # This file
```

## How to Run the System

### Option 1: Local File System
1. Download all files from the repository
2. Save them in a folder on your computer
3. Open `index.html` in your web browser
4. The application will work immediately (uses browser localStorage)

### Option 2: Web Server
1. Upload all files to a web server
2. Navigate to `index.html` in your browser
3. The application will work with full functionality

### Option 3: Live Preview
- If using VS Code, install the "Live Server" extension
- Right-click on `index.html` and select "Open with Live Server"

## Admin Login Credentials

Use these credentials to access the admin panel:

- **Email**: `admin@uni.com`
- **Password**: `admin123`

## Default Sample Events

The system comes with 5 pre-loaded sample events:

1. **Career Fair 2026** - Career networking event
2. **Web Development Workshop** - Hands-on coding workshop
3. **Guest Lecture: Innovation in Tech** - Industry expert seminar
4. **Sports Day** - Annual sports competition
5. **Python for Data Science** - Data science introduction course

These events are created automatically on first load and can be edited or deleted by the admin.

## Data Storage

All data is stored in the browser's **localStorage**:

- **users**: Registered student accounts
- **events**: Event information
- **bookings**: Student event bookings
- **currentUser**: Currently logged-in user session
- **initialized**: Flag to prevent re-initialization

Data persists even after closing the browser but is limited to ~5MB per domain.

## Key Features Explained

### 1. Registration & Authentication
- New students register with full details
- Passwords are validated (minimum 6 characters)
- Email and Student ID must be unique
- Admin has pre-set credentials

### 2. Event Management
- Events display current booking status
- Real-time capacity tracking (spots remaining)
- Events show as "Full" when capacity is reached
- Search functionality filters by name and category

### 3. Booking System
- One booking per student per event
- Automatic capacity updates
- Booking history with date stamps
- One-click cancellation with confirmation

### 4. Admin Dashboard
- Separate tab for event management and bookings view
- Add/Edit/Delete events with validation
- View all student bookings with student details
- Modal dialog for event editing

## Browser Compatibility

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Design Principles

- **Clean & Simple**: Minimalist design suitable for university coursework
- **Beginner-Friendly**: Easy to understand and navigate
- **Well-Commented Code**: Every section includes explanatory comments
- **Responsive**: Adapts to different screen sizes
- **Accessible**: Semantic HTML and proper form labels

## Future Enhancements

Potential features for future versions:
- Database integration (Node.js + MongoDB/PostgreSQL)
- User profile management
- Event notifications via email
- Payment gateway for ticketed events
- Event reviews and ratings
- Email confirmation for bookings
- Password reset functionality
- Event categories and filters
- Attendance tracking for admin

## Troubleshooting

### Issues with Data Not Saving?
- Check if localStorage is enabled in your browser
- Clear browser cache and try again
- Make sure you're not in private/incognito mode

### Events Not Showing?
- Refresh the page
- Check browser console for errors (F12)
- Clear localStorage and reload

### Admin Access Issues?
- Verify you're using the correct credentials
- Email: `admin@uni.com` | Password: `admin123`
- Make sure cookies/localStorage are enabled

## License

This project is free to use for educational purposes.

## Author

Created as a beginner-friendly Student Event Booking System for university coursework.

---

**Happy Coding! 🎓**