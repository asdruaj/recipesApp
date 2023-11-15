import { useEffect, useState } from 'react'
import { useRecipe } from '../context/RecipesContext'

export function useRecipeFilter () {
  const { recipesByUser, getRecipesByUser } = useRecipe()
  const [recipeFilter, setRecipeFilter] = useState('')

  useEffect(() => {
    const getRecipes = async () => {
      try {
        getRecipesByUser()
      } catch (error) {
        console.log(error)
      }
    }
    getRecipes()
  }, [])

  const filteredRecipes = recipesByUser?.filter(recipe => (
    recipe.title.toLowerCase().includes(recipeFilter.toLowerCase())
  ))

  return { filteredRecipes, setRecipeFilter }
}
