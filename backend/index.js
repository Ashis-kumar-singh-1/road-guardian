import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectToDB from './config/db.js'
import hospitalRouter from './routes/hospital.route.js'

const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// test route
app.get("/", (req, res) => {
  res.send("Road Guardian API Running")
})

// routes
app.use("/api/hospital", hospitalRouter)
// console.log(process.env.DB_URL)
// start server
app.listen(5000, () => {
  console.log("Server started at 5000")
  connectToDB() 
})