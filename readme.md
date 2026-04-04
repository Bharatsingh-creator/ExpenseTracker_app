
#  Expense Tracker App

A full-stack **Expense Tracker** web application that helps users manage their daily expenses efficiently with secure authentication and a modern UI.

---

##  Features

-  User Authentication (JWT-based)
-  Password Hashing for security
-  Add, edit, and delete expenses
-  Track spending easily
-  Fast and responsive UI
-  RESTful API integration

---

##  Tech Stack

### Frontend

- React.js  
- Vite  
- Tailwind CSS  
- Axios  

### Backend

- Node.js  
- Express.js  
- MongoDB  
- CORS  

### Security

- JSON Web Token (JWT)  
- Password Hashing (bcrypt)  

---

##  Project Structure

```

expense-tracker/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── main.jsx
│
└── README.md

````

---

##  How It Works

1. User registers and logs in securely  
2. Passwords are hashed before storing in the database  
3. After login, a JWT token is generated and sent to the client  
4. The frontend stores the token and uses it for authenticated API requests  
5. Users can:
   - Add expenses  
   - View expense list  
   - Delete or update expenses  
6. Backend verifies the token before allowing access to protected routes  
7. All data is stored in MongoDB  

---

##  Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
````

---

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm start
```

---

### 3️⃣ Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

##  API Endpoints (Example)

| Method | Endpoint           | Description    |
| ------ | ------------------ | -------------- |
| POST   | /api/auth/register | Register user  |
| POST   | /api/auth/login    | Login user     |
| GET    | /api/expenses      | Get expenses   |
| POST   | /api/expenses      | Add expense    |
| DELETE | /api/expenses/:id  | Delete expense |

---

##  Security Features

* Password hashing using bcrypt
* JWT-based authentication
* Protected routes
* Secure API communication

---

##  Contributing

Contributions are welcome!
Feel free to fork this repo and submit a pull request.

---


##  Support

If you like this project, give it a ⭐ on GitHub!

<img width="1917" height="930" alt="image" src="https://github.com/user-attachments/assets/413ff23c-47a0-4ac9-8343-99cb286e64d1" /><img width="1908" height="923" alt="image" src="https://github.com/user-attachments/assets/a4a66517-6025-4757-8c01-61d63a449db5" />
<img width="1897" height="910" alt="image" src="https://github.com/user-attachments/assets/e48f8ce9-e667-4319-a5c4-1485250d1e04" />
<img width="1887" height="905" alt="image" src="https://github.com/user-attachments/assets/dc9761d0-81bc-4b58-8c3d-3a5780f86ec1" />




