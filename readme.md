server/
 ├─ server.js        ← app entry point
 ├─ config/
 │   └─ db.js        ← database connection
 ├─ models/
 │   └─ User.js      ← database structure
 ├─ routes/
 │   └─ authRoutes.js ← URLs (endpoints)
 ├─ controllers/
 │   └─ authController.js ← logic
 └─ middleware/
     └─ authMiddleware.js ← checks (later)


🔄 How frontend + backend work together
Step-by-step real flow:

1️⃣ User opens a page

http://localhost:3000/register


➡️ Frontend page opens (React)

2️⃣ User fills form and clicks Register

3️⃣ Frontend sends request:

axios.post('/api/auth/register', formData)


4️⃣ Backend route runs:

registerUser(req, res)


5️⃣ Backend responds:

{ "message": "User registered successfully" }