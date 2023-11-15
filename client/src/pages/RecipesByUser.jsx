import { useRecipe } from '../context/RecipesContext'
import { Link, useNavigate } from 'react-router-dom'
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useRecipeFilter } from '../hooks/useRecipeFilter'

function RecipesByUser () {
  const { deleteRecipe } = useRecipe()
  const { filteredRecipes, setRecipeFilter } = useRecipeFilter()
  const navigate = useNavigate()

  const deleteItem = async (id, e) => {
    e.stopPropagation()
    deleteRecipe(id)
  }

  const hanldeChange = (e) => {
    setRecipeFilter(e.target.value)
  }
  return (
    <main className='p-6'>
      <div className='lg:flex justify-between'>
        <Link className='text-neutral-800 flex items-center ml-4 bg-slate-300 max-w-[10rem] rounded-md p-2 hover:bg-slate-400 hover:scale-105 transition-all ease-in-out hover:opacity-1 ' to='/new-recipe'>
          <PlusIcon width='1.5rem' /> New Recipe
        </Link>

        <input onChange={hanldeChange} type='text' className='mx-auto w-[80%] md:w-[30%] mt-4 md:mt-0 md:mr-4 block bg-slate-300 text-neutral-600 py-1 px-2 rounded-md border border-slate-500 shadow-xl placeholder:text-gray-500' placeholder='Search...' />

      </div>

      <section className='grid grid-cols-fluid'>
        {filteredRecipes?.map(recipe => (
          <div
            onClick={() => navigate(`/profile/recipes/${recipe._id}`)}
            key={recipe._id}
            className='text-slate-800 opacity-90 bg-slate-300 m-4 p-4 h-[200px] sm:h-[320px] rounded-md flex flex-col justify-between cursor-pointer hover:bg-slate-400 hover:scale-105 transition-all ease-in-out'
          >
            <div className='flex justify-between items-start'>
              <h3 className='font-bold text-2xl line-clamp-2'>{recipe.title}</h3>
              <button className='text-neutral-100 bg-slate-900 rounded-full p-1 hover:bg-red-900 transition-colors ease-in-out duration-500' onClick={(e) => deleteItem(recipe._id, e)}>
                <TrashIcon className='w-6' />
              </button>
            </div>

            <p className='line-clamp-3 sm:line-clamp-5 md:line-clamp-6'>{recipe.description}</p>
            <p className='text-end'><strong>Preparation time:</strong> {recipe.time} minutes</p>

          </div>
        ))}

      </section>

    </main>
  )
}

export default RecipesByUser
