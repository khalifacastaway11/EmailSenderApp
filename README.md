# EmailSenderApp

**EmailSenderApp** is a full-stack web application that allows users to register, log in, and send or schedule emails. It features user authentication with JWT, secure password hashing, and a modern React frontend.

## Features

- **User Registration & Login:** Secure authentication with hashed passwords and JWT tokens.
- **Send Emails:** Compose and send emails directly from the web interface.
- **Schedule Emails:** Schedule emails to be sent at a later time using cron jobs.
- **View Scheduled Emails:** See a list of all scheduled emails and manage them.
- **Reschedule or Cancel:** Update or cancel scheduled emails.
- **Protected Routes:** Only authenticated users can access email features.
- **Responsive UI:** Built with React and Tailwind CSS for a modern look.
- **Logout:** Securely log out and clear authentication tokens.

## Tech Stack

- **Frontend:** React, React Router, Axios, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens), bcryptjs
- **Email:** Nodemailer
- **Scheduling:** node-cron
- **Other:** dotenv, cookie-parser, cors

## Folder Structure

```
EmailSenderApp/
├── controllers/         # Express route controllers
├── models/              # Mongoose models
├── routes/              # Express route definitions
├── services/            # Email and scheduling logic
├── utils/               # Utility functions (JWT, etc.)
├── frontend/
│   └── email-sender-ui/ # React frontend app
├── .env                 # Environment variables (not committed)
├── app.js               # Main Express app
└── package.json         # Project dependencies
```

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/YOUR-USERNAME/EmailSenderApp.git
   cd EmailSenderApp
   ```

2. **Install backend dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root with your MongoDB URI, JWT secrets, and email credentials.

4. **Start the backend:**
   ```sh
   node app.js
   ```
   or
   ```sh
   npx nodemon app.js
   ```

5. **Set up the frontend:**
   ```sh
   cd frontend/email-sender-ui
   npm install
   npm start
   ```

6. **Visit the app:**  
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## License

This project is licensed under the MIT License.

---

**Feel free to customize this description for your project!**
