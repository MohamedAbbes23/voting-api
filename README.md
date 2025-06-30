# 🗳️ Voting API

A simple yet professional RESTful API for creating polls, voting, and viewing results — built with **Node.js**, **Express**, and **MongoDB**.

## 🚀 Features

- ✅ User registration & login with JWT authentication  
- ✅ Role-based access: Admins vs Users  
- ✅ Admins can create, end, and delete polls  
- ✅ Authenticated users can vote once per poll  
- ✅ Admins can view poll results anytime  
- ✅ Regular users can see results after poll ends  

## 🛠️ Tech Stack

- Node.js + Express  
- MongoDB + Mongoose  
- JWT for Authentication  
- bcryptjs for Password Hashing  
- dotenv for Config Management  

## 📂 Project Structure

```
voting-api/
│
├── controllers/       # Business logic
├── middleware/        # Auth & role-check middlewares
├── models/            # Mongoose schemas
├── routes/            # API route definitions
├── .env               # Environment variables
├── .gitignore
└── index.js           # App entry point
```

## 📦 Installation & Usage

```bash
git clone https://github.com/MohamedAbbes23/voting-api
cd voting-api
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the server:

```bash
npm run dev
```

## 🧪 API Endpoints Overview

### Auth

- `POST /api/auth/register` → Register new user (admin or user)  
- `POST /api/auth/login` → Login and receive JWT  
- `POST /api/auth/refresh` → Refresh token  

### Polls

- `POST /api/polls` → (Admin) Create a poll  
- `GET /api/polls` → List all polls  
- `GET /api/polls/:id` → View a specific poll  
- `PATCH /api/polls/:id/end` → (Admin) End a poll  
- `DELETE /api/polls/:id` → (Admin) Delete a poll  

### Voting

- `POST /api/polls/:id/vote` → (User) Vote for a poll  
- `GET /api/polls/:id/results` → View poll results (based on rules)  

## ✍️ Author

**Mohamed Abbes Nedjadi** — Backend Developer
