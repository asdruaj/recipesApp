import app from './app.js'
import { connectDB } from './database.js'

connectDB()
app.listen('https://mern-recipe-app-api-jzzq.onrender.com:3000')
console.log('Server on port 3000')
