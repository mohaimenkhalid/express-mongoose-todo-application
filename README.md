# Express Mongoose Todo Application

A standard, production-ready RESTful API for managing tasks (Todos) and user authentication. Built with **Node.js**, **Express.js**, and **MongoDB (Mongoose)**, this project implements a clean **Controller-Service-Repository** layered architecture.

---

## 🚀 Features

- **User Authentication**: Secure user registration (Signup) and login (Signin) with password hashing using `bcrypt` and token-based state using `JWT`.
- **Todo CRUD Operations**: Create, read, update, and delete tasks.
- **Batch Operations**: Support for deleting multiple tasks at once.
- **Auto-generated Slugs**: Auto-generation of url-friendly slugs from task titles using `slugify`.
- **Layered Architecture**: Decoupled code modules separation ensuring testability, maintainability, and clean separation of concerns.
- **Robust Error Handling**: Express middleware that handles Mongoose Validation Errors, MongoDB Duplicate Key Errors, and invalid ObjectId references gracefully.

---

## 🏗️ Project Architecture & Design Pattern

The project is structured around the **Controller-Service-Repository** design pattern. This ensures that database queries, business rules, and HTTP routing are entirely decoupled.

```text
src/
├── config/             # Configuration files (Database setup)
├── controllers/        # Route handlers (Parses HTTP requests & shapes responses)
├── middlewares/        # Express middleware (Auth protection & Global error handling)
├── models/             # Mongoose Schemas & Database models (User, Todo)
├── repositories/       # Data Access Layer (Executes raw Mongoose queries)
├── routes/             # Route declarations mapping endpoints to controllers
├── services/           # Business Logic Layer (Input validation, calculations, orchestrating repositories)
├── utils/              # General helper functions (Slug generation)
├── index.js            # Express application initialization & middleware bindings
└── server.js           # Entry point (Starts database connection & listens to port)
```

### Decoupled Layers Flow:
`HTTP Request` ➔ `Routes` ➔ `Middlewares (e.g. Auth Guard)` ➔ `Controller` ➔ `Service` ➔ `Repository` ➔ `Database (MongoDB)`

---

## 🛠️ Tech Stack & Dependencies

- **Node.js** & **Express (v5.x)** - Server runtime and framework.
- **MongoDB** & **Mongoose (v9.x)** - Database and Object Data Modeling (ODM).
- **JSON Web Tokens (JWT)** - Secure authorization.
- **Bcrypt** - Password hashing library.
- **Slugify** - Slug generator for title strings.
- **Dotenv** - Configuration loading via environment variables.
- **Nodemon** - Development server monitor.

---

## ⚙️ Prerequisites & Setup

Ensure you have the following installed on your local machine:
- **Node.js** (v18+)
- **MongoDB** (Local instance or Atlas connection string)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd mongoose-express-crud
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and copy the contents of `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Modify the variables as needed:
   ```env
   PORT=3000
   MONGO_URI=mongodb://127.0.0.1:27017/todo
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRES_IN=1h
   ```

4. **Running the Application:**
   * **Development Mode (with auto-reload):**
     ```bash
     npm run dev
     ```
   * **Production Mode:**
     ```bash
     npm start
     ```

---

## 🔌 API Documentation

### Base URL
```text
http://localhost:3000
```

### 1. Authentication (Public Routes)

#### 🔸 User Registration (Signup)
- **Endpoint:** `POST /auth/signup`
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "username": "johndoe",
    "password": "securepassword123"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Account created successfully"
  }
  ```

#### 🔸 User Login (Signin)
- **Endpoint:** `POST /auth/login`
- **Description:** Authenticates a user and returns a JWT token.
- **Request Body:**
  ```json
  {
    "username": "johndoe",
    "password": "securepassword123"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "message": "Login successful!"
  }
  ```

---

### 2. Users (Public/Internal)

#### 🔸 Get All Users
- **Endpoint:** `GET /users`
- **Description:** Retrieve a list of all registered users (passwords are omitted).
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Users fetched successfully",
    "data": [
      {
        "_id": "64b0f...",
        "name": "John Doe",
        "username": "johndoe",
        "status": "active"
      }
    ]
  }
  ```

---

### 3. Todo Management (Protected Routes)
> [!IMPORTANT]
> All `/todo` endpoints require authorization. You must include the JWT token in the `Authorization` header:
> `Authorization: Bearer <your_access_token>`

#### 🔸 Create a Todo
- **Endpoint:** `POST /todo`
- **Request Body:**
  ```json
  {
    "title": "Complete Express Project",
    "description": "Implement authentication and write clean documentation",
    "status": "active"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Todo created successfully",
    "data": {
      "title": "Complete Express Project",
      "slug": "complete-express-project",
      "description": "Implement authentication and write clean documentation",
      "status": "active",
      "date": "2026-07-15T15:52:00.000Z",
      "createdBy": "64b0f...",
      "_id": "64b1f...",
      "__v": 0
    }
  }
  ```

#### 🔸 Get All Todos
- **Endpoint:** `GET /todo`
- **Description:** Fetches all tasks, populating creator details.
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Todos fetched successfully",
    "data": [
      {
        "_id": "64b1f...",
        "title": "Complete Express Project",
        "slug": "complete-express-project",
        "description": "Implement authentication and write clean documentation",
        "status": "active",
        "date": "2026-07-15T15:52:00.000Z",
        "createdBy": {
          "_id": "64b0f...",
          "name": "John Doe",
          "username": "johndoe"
        }
      }
    ]
  }
  ```

#### 🔸 Get Todo by ID
- **Endpoint:** `GET /todo/:id`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "_id": "64b1f...",
      "title": "Complete Express Project",
      "slug": "complete-express-project",
      "description": "Implement authentication and write clean documentation",
      "status": "active",
      "date": "2026-07-15T15:52:00.000Z",
      "createdBy": "64b0f..."
    }
  }
  ```

#### 🔸 Update Todo by ID
- **Endpoint:** `PATCH /todo/:id`
- **Request Body:** (Any fields to update)
  ```json
  {
    "status": "inactive"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Todo updated successfully",
    "data": {
      "_id": "64b1f...",
      "title": "Complete Express Project",
      "slug": "complete-express-project",
      "description": "Implement authentication and write clean documentation",
      "status": "inactive",
      "date": "2026-07-15T15:52:00.000Z",
      "createdBy": "64b0f..."
    }
  }
  ```

#### 🔸 Delete Todo by ID
- **Endpoint:** `DELETE /todo/:id`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Todo deleted successfully"
  }
  ```

#### 🔸 Batch Delete Todos
- **Endpoint:** `DELETE /todo`
- **Description:** Delete multiple tasks at once.
- **Request Body:**
  ```json
  {
    "ids": [
      "64b1f...",
      "64b2a..."
    ]
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "2 todo(s) deleted successfully."
  }
  ```

---

## 🛡️ Error Response Structures

All errors are processed globally and structured uniformly.

### validation error (400 Bad Request)
Happens when input rules in Mongoose schema validation fail.
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "title": "Title is required"
  }
}
```

### duplicate resource error (409 Conflict)
Happens when attempting to insert a duplicate value for a `unique` field (like `username` or Todo `title`).
```json
{
  "success": false,
  "message": "username already exists",
  "errors": {
    "username": "username must be unique"
  }
}
```

### unauthorized / token issues (401 Unauthorized)
```json
{
  "success": false,
  "message": "Token has expired."
}
```
