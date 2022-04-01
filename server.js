const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const app = express()
const env = require("dotenv");
env.config({ path: "./config/.env" })
const PORT = process.env.PORT
const db = require('./config/db');
const product = require('./routers/product-router')
const user = require("./routers/user-router")
const payment = require("./routers/payment-routes")
const Razorpay = require('razorpay');


db()

app.use(cors());
app.use(express.json({ extended: false }))

app.use("/api/products", product)
app.use("/api/user", user)
app.use("/api/payment", payment)

app.listen(PORT || 5000, () => console.log(`http://localhost:${PORT || 5000}`))