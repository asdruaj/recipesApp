import { useEffect, useState } from 'react'
import { useRecipe } from '../context/RecipesContext'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

function Recipes () {
  const { allRecipes, getAllRecipes } = useRecipe()
  const [isLoading, setIsLoading] = useState(false)
  const [recipeFilter, setRecipeFilter] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const getRecipes = async () => {
      try {
        setIsLoading(true)
        getAllRecipes()
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    getRecipes()
  }, [])

  const filteredRecipes = allRecipes?.filter(recipe => (
    recipe.title.toLowerCase().includes(recipeFilter.toLowerCase())
  ))

  const handleChange = (e) => {
    setRecipeFilter(e.target.value)
  }
  return isLoading
    ? <Spinner />
    : (
      <main className='p-6'>
        <input onChange={handleChange} type='text' className='mx-auto w-[80%] md:w-[30%] mt-4 md:mt-0 md:mr-4 block bg-slate-300 text-neutral-600 py-1 px-2 rounded-md border border-slate-500 shadow-xl placeholder:text-gray-500' placeholder='Search...' />
        <section className='grid grid-cols-fluid '>
          {filteredRecipes?.map(recipe => (
            <div
              onClick={() => navigate(`/recipes/${recipe._id}`)}
              key={recipe._id}
              className='text-slate-800 opacity-90 bg-slate-300 m-4 p-4 h-[200px] sm:h-[320px] rounded-md flex flex-col justify-between cursor-pointer hover:bg-slate-400 hover:scale-105 hover:opacity-1 transition-all ease-in-out'
            >
              <div className='flex justify-between items-start'>
                <h3 className='font-bold text-2xl'>{recipe.title}</h3>
              </div>

              <div className='h-[40%]'>
                <p className='line-clamp-3 sm:line-clamp-5 md:line-clamp-6'>{recipe.description}</p>
              </div>
              <div>
                <p className='text-end mb-2'><strong>Preparation time:</strong> {recipe.time} minutes</p>
                <p className='text-end'><strong>By:</strong> {recipe.user.username}</p>
              </div>

            </div>
          ))}

        </section>

      </main>
      )
}

export default Recipes
