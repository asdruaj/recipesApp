import mongoose from 'mongoose'

export async function connectDB () {
  try {
    await mongoose.connect('mongodb+srv://asdruaj:asjoalal@cluster0.vo0wwja.mongodb.net/recipeApp')
    console.log('Database is connected')
  } catch (error) {
    console.log(error)
  }
}
