import axios from './axios.js'

export const saveRecipeRequest = (data) => axios.post('/recipes', data)

export const getAllRecipesRequest = () => axios.get('/recipes')

export const getRecipesByUserRequest = () => axios.get('/profile/recipes')

export const getRecipeRequest = (id) => axios.get(`/recipes/${id}`)

export const updateRecipeRequest = (id, data) => axios.put(`/recipes/${id}`, data)

export const deleteRecipeRequest = (id) => axios.delete(`/recipes/${id}`)
