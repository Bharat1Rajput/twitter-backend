# Twitter Backend 🐦

A **production-ready Twitter clone backend** built with modern Node.js technologies, showcasing scalable architecture, security best practices, and comprehensive API design.

## 🚀 Live Demo
- **API Base URL:** (https://twitter-backend-3lau.onrender.com)

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Security Features](#security-features)
- [Contributing](#contributing)

## ✨ Features

### Core Functionality
- 🔐 **User Authentication** - JWT-based secure authentication
- 👤 **User Management** - Profile creation, updates, and user discovery
- 🐦 **Tweet System** - Create, read, delete tweets with 280 character limit
- ❤️ **Social Interactions** - Like/unlike tweets with real-time counts
- 👥 **Follow System** - Follow/unfollow users with relationship management
- 🔍 **Search Functionality** - Search users and tweets
- 📱 **Timeline Feed** - Personalized timeline based on following

### Technical Features
- 📊 **RESTful API Design** - Clean, intuitive endpoints
- 🛡️ **Security First** - Input validation, rate limiting, CORS protection
- 📈 **Scalable Architecture** - Modular design with separation of concerns
- 🗄️ **Database Optimization** - Efficient MongoDB queries with proper indexing
- 📝 **Comprehensive Validation** - Request validation with detailed error messages
- 🚦 **Error Handling** - Consistent error responses across all endpoints

## 🛠 Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** express-validator
- **Security:** bcryptjs, helmet, cors, express-rate-limit

### Development Tools
- **Environment Management:** dotenv
- **Development Server:** nodemon
- **Version Control:** Git & GitHub

## 🏗 Architecture

```
twitter-backend/
├── config/              # Database configuration
│   └── database.js
├── controllers/         # Business logic layer
│   ├── authController.js
│   ├── tweetController.js
│   ├── userController.js
│   └── searchController.js
├── middleware/          # Custom middleware
│   ├── auth.js         # Authentication middleware
│   └── validation.js   # Validation middleware
├── models/             # Database models
│   ├── User.js
│   └── Tweet.js
├── routes/             # API routes
│   ├── auth.js
│   ├── tweets.js
│   ├── users.js
│   └── search.js
├── validators/         # Input validation schemas
│   ├── userValidation.js
│   └── tweetValidation.js
├── .env              # Environment variables
├── .gitignore
├── package.json
└── server.js         # Application entry point
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Bharat1Rajput/twitter-backend.git
   cd twitter-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your configuration:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/twitter-backend
   JWT_SECRET=your_super_secret_jwt_key_here
   NODE_ENV=development
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or ensure MongoDB Atlas connection is configured
   ```

5. **Run the application**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Verify installation**
   ```bash
   curl http://localhost:5000/
   # Should return: {"message":"Twitter Backend API is running!"}
   ```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users/profile` | Get current user profile | Yes |
| PUT | `/api/users/profile` | Update user profile | Yes |
| GET | `/api/users/:username` | Get user by username | No |
| POST | `/api/users/:userId/follow` | Follow/unfollow user | Yes |
| GET | `/api/users/:userId/followers` | Get user followers | No |
| GET | `/api/users/:userId/following` | Get user following | No |

### Tweet Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/tweets` | Create new tweet | Yes |
| GET | `/api/tweets` | Get public timeline | No |
| GET | `/api/tweets/timeline` | Get personalized timeline | Yes |
| POST | `/api/tweets/:tweetId/like` | Like/unlike tweet | Yes |
| DELETE | `/api/tweets/:tweetId` | Delete tweet | Yes |
| GET | `/api/tweets/user/:userId` | Get user's tweets | yes |
| GET | `/api/tweets/user//:tweetId/analytics` | Get tweet analytics | yes |

### Search Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/search/users?q=query` | Search users | Yes |
| GET | `/api/search/tweets?q=query` | Search tweets | Yes |



## 🔒 Security Features

- **Authentication:** JWT-based stateless authentication
- **Password Security:** bcrypt hashing with salt rounds
- **Input Validation:** Comprehensive validation using express-validator
- **CORS Protection:** Cross-origin resource sharing configuration
- **Security Headers:** Helmet.js for setting various HTTP headers
- **Data Sanitization:** Input sanitization to prevent XSS attacks
- **Authorization:** Route-level authentication middleware


## 📈 Future Enhancements

- [ ] **Caching Layer** - Redis implementation for improved performance
- [ ] **Real-time Features** - WebSocket integration for live notifications
- [ ] **File Upload** - Image/video upload for tweets and profiles
- [ ] **Email Service** - Email verification and notifications
- [ ] **Push Notifications** - Mobile push notification system
- [ ] **Analytics** - Tweet engagement and user activity analytics
- [ ] **Admin Panel** - Administrative dashboard for user management
- [ ] **API Versioning** - Versioned API endpoints for backward compatibility

## 📊 Project Statistics

- **Total Lines of Code:** ~2,000+
- **API Endpoints:** 15+
- **Database Models:** 2
- **Middleware Functions:** 3+
- **Validation Schemas:** 5+

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Bharat Rajput**
- GitHub: [@Bharat1Rajput](https://github.com/Bharat1Rajput)
- LinkedIn: [Bharat Singh](https://www.linkedin.com/in/bharat-singh-1288a4254)
- Email: bharattsingh33@gmail.com

## 🙏 Acknowledgments

- Express.js community for excellent documentation
- MongoDB team for the robust database solution
- All contributors who helped improve this project

---

⭐ **Star this repository if it helped you learn backend development!**

**Built with ❤️ by Bharat Rajput**
