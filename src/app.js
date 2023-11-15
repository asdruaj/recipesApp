import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'
import recipeRoutes from './routes/recipe.routes.js'

const app = express()

app.use(cors({
  origin: 'https://mern-recipe-app.onrender.com',
}))

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/api', authRoutes)
app.use('/api', recipeRoutes)

export default app
