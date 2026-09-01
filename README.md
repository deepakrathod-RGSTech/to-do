# MERN Todo App

A simple to-do application built with the MERN stack (MongoDB, Express, React, Node.js) featuring user authentication and CRUD operations.

## Features

- User registration and login with JWT authentication
- Create, read, update, and delete todos
- Mark todos as completed
- User-specific todos (each user sees only their own todos)
- Clean and responsive UI

## Tech Stack

- **Backend**: Node.js, Express, MongoDB, JWT, bcryptjs
- **Frontend**: React, React Router, Axios
- **Database**: MongoDB

## Hello 
## Prerequisites

- Node.js installed
- MongoDB installed and running on localhost:27017

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todoapp
JWT_SECRET=your_jwt_secret_key_here
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Register a new account
3. Login with your credentials
4. Create, edit, and manage your todos

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Todos
- `GET /api/todos` - Get all todos for authenticated user
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Project Structure

```
To-do/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Todo.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── todos.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   └── TodoList.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── utils/
    │   │   └── api.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── public/
    │   └── index.html
    └── package.json
```
