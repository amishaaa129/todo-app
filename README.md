# Full Stack Todo Management Application

A full-stack task management application built using React, Express.js, MongoDB Atlas, and JWT Authentication. The application allows users to securely manage their personal tasks while providing role-based access control for administrators.

## Features

### Authentication & Authorization

* User Registration
* User Login
* Password Hashing using bcrypt
* JWT Authentication
* Refresh Token Support
* HTTP-only Cookie Storage
* Protected Routes
* Role-Based Access Control (User/Admin)

### Task Management

* Create Tasks
* View Personal Tasks
* Update Task Status
* Delete Tasks
* Set Task Priority (Low, Medium, High)
* Add Task Descriptions
* Set Due Dates

### Admin Features

* View All Users
* View All Tasks
* Promote Users to Admin
* Delete Any Task

### Frontend Features

* Responsive UI using React and Tailwind CSS
* Authentication Pages
* Dashboard for Task Management
* Create Task Page
* Admin Dashboard
* Error Handling & Validation Feedback

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Fetch API

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt

### Database

* MongoDB Atlas
* Mongoose ODM

## Getting Started

### Clone Repository

```bash
git clone <repository-url>
cd <repository-name>
```

### Install Dependencies

Frontend:

```bash
npm install
```

Backend:

```bash
cd backend
npm install
```

### Run Backend

```bash
npm start
```

### Run Frontend

```bash
npm run dev
```

---

## Author

Developed as a Full Stack MERN application demonstrating authentication, authorization, REST API development, MongoDB integration, and React frontend development.
