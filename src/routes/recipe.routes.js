import { Router } from 'express'
import { authRequired } from '../middlewares/verifyToken.js'
import {
  getRecipes,
  getRecipesByUser,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe
} from '../controllers/recipe.controller.js'

const router = Router()

router.get('/recipes', getRecipes)
router.get('/profile/recipes', authRequired, getRecipesByUser)
router.get('/recipes/:id', getRecipe)
router.post('/recipes', authRequired, createRecipe)
router.put('/recipes/:id', authRequired, updateRecipe)
router.delete('/recipes/:id', authRequired, deleteRecipe)

export default router
