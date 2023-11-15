import { useForm, useFieldArray } from 'react-hook-form'
import { useRecipe } from '../context/RecipesContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'
import { getRecipeRequest } from '../api/recipes'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

function RecipeForm () {
  const { register, control, formState: errors, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: '',
      description: '',
      time: '',
      ingredients: [{ item: '' }],
      preparation: ''
    }
  })

  const { createRecipe, updateRecipe } = useRecipe()

  const navigate = useNavigate()

  const { user } = useAuth()

  const [isDisabled, setIsDisabled] = useState(false)

  const { id: paramsId } = useParams()

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'ingredients'
  })

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        if (paramsId) {
          const { data: recipe } = await getRecipeRequest(paramsId)
          console.log(recipe)

          recipe?.ingredients?.map((ingredient, index) => {
            return update(index, ingredient)
          })

          setValue('title', recipe.title)
          setValue('category', recipe.category)
          setValue('description', recipe.description)
          setValue('time', recipe.time)
          setValue('preparation', recipe.preparation)

          if (user.id !== recipe.user._id) {
            setIsDisabled(true)
            navigate(`/recipes/${recipe._id}`)
          } else {
            setIsDisabled(false)
          }
        }
      } catch (error) {
        // TODO redirect to ERROR PAGE
        navigate('/profile/recipes', { replace: true })
      }
    }
    loadRecipe()
  }, [])

  const onSubmit = handleSubmit(async (data) => {
    paramsId ? await updateRecipe(paramsId, data) : await createRecipe(data)
    navigate('/profile/recipes')
  })

  return (
    <main className='grid place-items-center p-8 bg-hero-bg bg-cover'>
      <div className='text-neutral-800 bg-slate-300/75 max-w-2xl w-full p-8 rounded-md'>

        <fieldset disabled={isDisabled}>

          <form onSubmit={onSubmit}>
            <label
              htmlFor='title'
              className='text-xl font-bold'
            >
              Title
            </label>

            <input
              id='title'
              {...register('title', { required: true })}
              type='text'
              className='w-full px-4 py-2 bg-slate-400 my-2 rounded-sm opacity-'
              autoFocus
            />
            <label
              htmlFor='category'
              className='text-xl font-bold'
            >
              Category
            </label>

            <select
              defaultValue=''
              className='w-full px-4 py-2 bg-slate-400 my-2 rounded-sm'
              {...register('category', { required: true })}
            >
              <option className='hidden'>Choose a category...</option>
              <option value='Breakfast'>Breakfast</option>
              <option value='Lunch'>Lunch</option>
              <option value='Dinner'>Dinner</option>
              <option value='Salad'>Salad</option>
              <option value='Dessert'>Dessert</option>
              <option value='Other'>Other</option>
            </select>

            <label
              htmlFor='description'
              className='text-xl font-bold'
            >
              Description
            </label>

            <textarea
              id='description'
              {...register('description', { required: true })}
              rows='4'
              className='w-full px-4 py-2 bg-slate-400 my-2 rounded-sm'
            />

            <label
              htmlFor='time'
              className='text-xl font-bold'
            >
              Time (in minutes)
            </label>

            <input
              id='time'
              {...register('time', { required: true })}
              type='number'
              className='w-full px-4 py-2 bg-slate-400 my-2 rounded-sm'
            />

            <label
              className='text-xl font-bold'
            >
              Ingredients
            </label>

            <ul className=''>
              {fields.map((item, index) => (
                <li className='flex gap-4 relative' key={item.id}>
                  <input
                    {...register(`ingredients.${index}.item`, { required: true })}
                    control={control}
                    type='text'
                    className='w-full px-4 py-2 bg-slate-400 my-2 rounded-sm'
                  />
                  {
                  index > 0 &&
                  !isDisabled &&
                    <button
                      onClick={() => remove(index)}
                      className='text-neutral-200 hover:bg-slate-700 transition-colors ease-in bg-slate-600 px-4 py-2 my-2 rounded-sm right-0 absolute'
                    >
                      <TrashIcon width='1.5rem' />
                    </button>
                }
                </li>
              ))}
            </ul>

            {
              !isDisabled &&
                <button
                  type='button'
                  onClick={() => append({ item: '' })}
                  className='mx-auto text-neutral-200 hover:bg-slate-700 transition-colors ease-in bg-slate-600 w-[20%] min-w-[5rem] p-2 font-bold rounded-md flex justify-evenly'
                ><PlusIcon width='1.5rem' /><span>Add</span>
                </button>
            }
            <label
              htmlFor='preparation'
              className='text-xl font-bold'
            >
              Preparation
            </label>
            <textarea
              id='preparation'
              {...register('preparation', { required: true })}
              rows='10'
              className='w-full px-4 py-2 bg-slate-400 my-2 rounded-sm'
            />
            {!isDisabled && <button className='mx-auto text-neutral-200 hover:bg-slate-700 transition-colors ease-in bg-slate-600 w-[40%] min-w-[5rem] p-2 font-bold rounded-md flex justify-evenly'>Submit</button>}
          </form>
        </fieldset>

      </div>
    </main>

  )
}

export default RecipeForm
