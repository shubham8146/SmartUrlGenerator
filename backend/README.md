# Smart URL System

A full-stack URL shortener application with user authentication, custom aliases, and click tracking.

## Project Structure

```
smart-url-system/
├── backend/
│   ├── server.js              # Express server entry point
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Url.js             # URL schema
│   ├── controllers/
│   │   ├── authController.js  # Auth logic
│   │   └── urlController.js   # URL shortening logic
│   ├── routes/
│   │   ├── authRoutes.js      # Auth endpoints
│   │   └── urlRoutes.js       # URL endpoints
│   ├── middleware/
│   │   ├── authMiddleware.js  # JWT verification
│   │   └── errorMiddleware.js # Error handling
│   ├── utils/
│   │   └── generateCode.js    # Short code generator
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
└── frontend/
    ├── index.html             # Login/Signup page
    ├── dashboard.html         # Main application
    ├── css/
    │   └── style.css          # Styling
    ├── js/
    │   ├── auth.js            # Authentication logic
    │   └── dashboard.js       # Dashboard logic
    └── package.json
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:

   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your MongoDB connection string:

   ```
   MONGODB_URI=mongodb://localhost:27017/smart-url
   JWT_SECRET=your_secret_key_here
   ```

5. Start the server:
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Start a simple HTTP server:

   ```bash
   # Using Python 3
   python -m http.server 3000

   # or using Node.js (if installed)
   npx http-server -p 3000
   ```

The frontend will run on `http://localhost:3000`

## Features

- **User Authentication**: Secure login and signup with bcrypt password hashing
- **JWT Tokens**: Stateless authentication using JSON Web Tokens
- **URL Shortening**: Generate short codes for long URLs
- **Custom Aliases**: Create custom short codes for your URLs
- **Click Tracking**: Track how many times your shortened URLs are clicked
- **URL Management**: View, copy, and delete your shortened URLs
- **Responsive Design**: Works on desktop and mobile devices

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### URLs

- `POST /api/urls/create` - Create a short URL (requires auth)
- `GET /api/urls` - Get all URLs for authenticated user
- `GET /api/urls/:code` - Redirect to original URL
- `DELETE /api/urls/:id` - Delete a URL (requires auth)

## Technologies Used

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- jsonwebtoken

### Frontend

- HTML5
- CSS3
- Vanilla JavaScript

## Environment Variables

Create a `.env` file in the backend directory:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart-url
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
BASE_URL=http://localhost:5000
```

## Development

Run backend with nodemon for auto-reload on changes:

```bash
cd backend
npm run dev
```

Run frontend with hot-reload:

```bash
cd frontend
npm start
```

## License

MIT
