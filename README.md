# Setup Instructions

## 1. Install Dependencies

### Backend

cd backend
npm install
cp .env.example .env

### Frontend

cd frontend
npm install

---

## 2. Run the Backend

cd backend
npm run dev

Backend will start at:
**http://localhost:4000**

---

## 3. Run the Frontend

cd frontend
npm start

Frontend will start at:
**http://localhost:3000**

---

## 4. Initialize the Database

1. Start MySQL (e.g., via XAMPP)
2. Open phpMyAdmin:
   http://localhost/phpmyadmin
3. Create a database named **cashwiz**
4. Open the database → go to the **SQL** tab
5. Paste and execute the content of **database.sql**

This will create:

- tables: `users`, `user_actions`
- a demo user:

  email: test@test.com
  password: password123
