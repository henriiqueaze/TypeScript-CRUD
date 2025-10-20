# <p align="center">User CRUD API</p>

A simple RESTful API for managing users with hashed passwords, CORS support, and pagination.

---

## ✨ Features

- Create, Read, Update, Delete users (CRUD)
- Password hashing for security
- Configurable CORS via .env file
- Pagination for listing users

---

## ⚙️ Technologies

- TypeScript
- Node.js
- Prisma ORM
- PostgreSQL

---

## 🚀 How to Use

1. **Clone the repository:**

   ```bash
   git@github.com:henriiqueaze/TypeScript-CRUD.git

   cd TypeScript-CRUD
   ```

2. **Create the Postgres database:**
   Before running the application, make sure you have a Postgres server running locally or accessible remotely,
   and create the database used by the app:

   ```bash
   CREATE DATABASE dbname;
   ```

3. **Install dependencies::**

   ```bash
   npm install
   ```

4. **Generate Prisma client:**

   ```bash
   npx prisma generate
   ```

5. **Create a .env file in the root directory and configure:**

   ```bash
   DATABASE_URL=postgresql://user:password@localhost:5432/dbname

   CORS_ALLOWED_ORIGINS=http://localhost:3000,https://your-frontend.com
   ```

6. **Run the development server:**
   ```bash
   npm run dev
   ```

---

## 🔗 API Endpoints

- 📄 `GET /user/{id}` - Retrieve a specific user details
- 📥 `GET /user/` - Retrieve all users details. Optional query parameters for pagination:

  - page: page number (default: 1)
  - size: number of records per page (default: 10)
  - direction: sorting direction, asc or desc (default: asc)
    - Example:

  ```bash
  GET /user/?page=0&size=10&direction=asc
  ```

- 🆕 `POST /user/` - Register a new user
- ✏️ `PUT /user/` - Update user information
- 🖊️ `PATCH /user/id` - Update a user a specific field
- ❌ `DELETE /user/id` - Remove a user record

---

<p align="center">For contributions or support, please contact me via email at <a href="mailto:henriqueeaze.dev@gmail.com">henriqueeaze.dev@gmail.com</a> or connect with me on <a href="https://www.linkedin.com/in/henrique-azevedo-b2195b2b0/">Linkedin</p>
