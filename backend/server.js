const express=require('express')
const cors=require('cors')
require('dotenv').config()

const connectDB=require('./config/db.js')
const authRoutes=require('./routes/authRoutes.js')
const transactionRoutes = require('./routes/transactionsRoutes')

const app=express()


app.use(express.json())
app.use(cors())
app.use('/api/auth',authRoutes)
app.use('/api/transactions', transactionRoutes)

connectDB()

app.listen(5000,()=>console.log("SERVER is running on 5000 port "))