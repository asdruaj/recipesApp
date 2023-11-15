import React, { useEffect, useState } from 'react'
import { getRecipeRequest } from '../api/recipes'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'

const Recipe = () => {
  const [recipe, setRecipe] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { id: paramsId } = useParams()

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        setIsLoading(true)
        if (paramsId) {
          const { data: recipeData } = await getRecipeRequest(paramsId)
          console.log(recipeData)
          setRecipe(recipeData)
        }
      } catch (error) {
      // TODO redirect to error page
        console.log(error)
        navigate('/recipes', { replace: true })
      } finally {
        setIsLoading(false)
      }
    }
    loadRecipe()
  }, [])

  useEffect(() => {

  }, [])

  return isLoading
    ? <Spinner />
    : (
      <main className='text-neutral-800 p-8 w-full mx-auto'>
        <h1 className='text-4xl font-bold text-center mb-2'>{recipe?.title}</h1>

        <div className='md:grid md:grid-cols-2 md:gap-8 px-8 py-4 bg-slate-300/75 rounded-lg shadow-2xl'>

          <div>
            <h3 className='text-xl font-semibold'>Category: {recipe?.category}</h3>
            <h3 className='mb-4'>Preparation Time: {recipe?.time} minutes</h3>
            <h3 className='mb-2 text-xl font-semibold'>Description</h3>
            <p className='mb-4 whitespace-pre-line'>{recipe?.description}</p>
            <h3 className='text-xl font-semibold mb-2'>Ingredients</h3>
            <ul className='list-disc md:grid md:grid-cols-fluid-sm md:gap-4'>
              {
                recipe?.ingredients?.map(({ item }) => (
                  <li className='mb-2' key={item}>{item}</li>
                ))
            }
            </ul>
          </div>

          <div className='justify-self-end'>

            <h3 className='mb-2 text-xl font-semibold'>Preparation</h3>
            <p className='whitespace-pre-line'>{recipe?.preparation}</p>
          </div>
        </div>
      </main>
      )
}

export default Recipe
