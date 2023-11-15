import mongoose from 'mongoose'

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },
  ingredients: [{
    item: {
      type: String,
      required: true
    }
  }],

  time: {
    type: Number,
    required: true
  },
  preparation: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.model('Recipe', recipeSchema)
