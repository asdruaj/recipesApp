import { createContext, useContext, useState } from 'react'
import { deleteRecipeRequest, getAllRecipesRequest, getRecipesByUserRequest, saveRecipeRequest, updateRecipeRequest } from '../api/recipes'

const RecipeContext = createContext()

export const useRecipe = () => {
  const context = useContext(RecipeContext)

  if (!context) throw new Error('useRecipe must be within a RecipeProvider')

  return context
}

export const RecipesProvider = ({ children }) => {
  const [allRecipes, setAllRecipes] = useState()
  const [recipesByUser, setRecipesByUser] = useState()
  const [recipeErrors, setRecipeErrors] = useState()

  const getAllRecipes = async () => {
    try {
      const res = await getAllRecipesRequest()
      setAllRecipes(res.data)
    } catch (error) {
      setRecipeErrors(error.response.data)
      console.log(error)
    }
  }
  const getRecipesByUser = async () => {
    try {
      const res = await getRecipesByUserRequest()
      setRecipesByUser(res.data)
    } catch (error) {
      setRecipeErrors(error.response.data)
      console.log(error)
    }
  }

  const createRecipe = async (data) => {
    try {
      const res = await saveRecipeRequest(data)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const updateRecipe = async (id, data) => {
    try {
      const res = await updateRecipeRequest(id, data)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  const deleteRecipe = async (id) => {
    try {
      const res = await deleteRecipeRequest(id)
      if (res.status === 204) setRecipesByUser(recipesByUser.filter(recipe => recipe._id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <RecipeContext.Provider value={{
      getAllRecipes,
      getRecipesByUser,
      createRecipe,
      updateRecipe,
      deleteRecipe,
      recipesByUser,
      allRecipes,
      recipeErrors
    }}
    >
      {children}
    </RecipeContext.Provider>
  )
}
