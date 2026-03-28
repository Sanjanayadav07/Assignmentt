# 🚀 Task Manager API (MERN Stack)

A full-stack Task Manager application built using the MERN stack (MongoDB, Express, React, Node.js) with secure JWT authentication and Role-Based Access Control (RBAC).

---

## 📌 Project Overview

This project demonstrates the design of a scalable backend system with authentication, authorization, and CRUD operations, along with a basic frontend UI to interact with APIs.

---

## ✨ Features

### 🔐 Authentication & Security
- User Registration & Login
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes using middleware

### 👤 Role-Based Access Control (RBAC)
- **User**
  - Can create, update, and delete their own tasks
- **Admin**
  - Can view all users' tasks
  - Can update/delete any task

### 📋 Task Management (CRUD)
- Create new tasks
- View tasks
- Update tasks
- Delete tasks

### ⚡ Backend Features
- RESTful API design
- API versioning (`/api/v1`)
- Input validation using express-validator
- Centralized error handling
- Scalable folder structure

### 🖥 Frontend Features
- Register & Login UI
- Protected Dashboard
- Create / Update / Delete tasks
- API integration with Axios
- Success/Error notifications

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt (Password hashing)

### Frontend
- React.js
- Axios
- React Router
- React Toastify

---

## 📌 API Endpoints

### 🔐 Authentication

| Method | Endpoint | Description |
|--------|---------|------------|
| POST | /api/v1/auth/register | Register a new user |
| POST | /api/v1/auth/login | Login user |

---

### 📋 Tasks

| Method | Endpoint | Description |
|--------|---------|------------|
| GET | /api/v1/tasks | Get tasks (Admin: all, User: own) |
| POST | /api/v1/tasks | Create a new task |
| PUT | /api/v1/tasks/:id | Update a task |
| DELETE | /api/v1/tasks/:id | Delete a task |

---

## 🔐 Authentication Usage

After login, include JWT token in request headers:
Authorization: Bearer YOUR_TOKEN


---

## ▶️ Run Locally

### 1️⃣ Clone Repository
```bash
git clone <your-repo-link>
cd project-folder
```
### 2️⃣ Backend Setup
- cd backend
- npm install
- npm run dev
### 3️⃣ Frontend Setup
- cd frontend
- npm install
- npm run dev
---
## 🔑 Environment Variables
- Create a .env file in backend:
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```
---
## 🌐 API Documentation
```
- Swagger UI available at:
    http://localhost:5000/api-docs
  ```
## 🧠 Scalability Notes
- Modular architecture (controllers, routes, middleware)
- Stateless JWT authentication (scalable)
- Can be extended to microservices architecture
- Redis caching can be added for performance optimization
- Load balancing via Nginx or cloud services
---

## 🚀 Future Improvements
- Task filtering & search
- Pagination
- Due date & priority
- Docker deployment
- Redis caching

---

### 👩‍💻 Author
- Sanjana Yadav
