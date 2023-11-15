import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'

function Login () {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { login, user, errors: authErrors, setErrors } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (user) => {
    setIsLoading(true)
    await login(user)
    setIsLoading(false)
  })

  useEffect(() => {
    setErrors({ signup: [] })
  }, [])

  useEffect(() => {
    if (user) navigate('/recipes', { replace: true })
  }, [user])

  useEffect(() => {
    authErrors.login?.map(error => toast.error(error.message))
  }, [authErrors])

  return (
    <main className='grid place-content-center min-h-[calc(100vh-100px)]'>

      <div className=' bg-slate-300/75 p-8 max-w-md m-4 rounded-md border border-slate-500 shadow-2xl '>
        <h1 className='text-neutral-800 text-2xl font-bold mb-4 tracking-wide'>Login</h1>
        <Toaster duration='5000' richColors />

        <form onSubmit={onSubmit}>
          <label className='text-lg font-semibold text-neutral-800' htmlFor='username'>Username</label>
          <input id='username' className='w-full my-2 bg-slate-500 rounded-sm px-4 py-2' placeholder='ThisIsMyUsername1995 ' type='text' {...register('username', { required: true })} />
          {
            errors.username?.type === 'required' && <p className='text-red-500 w-full inline-block'> Username is Required</p>
          }

          <label className='text-lg font-semibold text-neutral-800' htmlFor='password'>Password</label>
          <input placeholder='••••••••••' id='password' className='w-full my-2 bg-slate-500 rounded-sm px-4 py-2' type='password' {...register('password', { required: true })} />
          {
            errors.password?.type === 'required' && <p className='text-red-500'> Password is Required</p>
          }

          {
          !isLoading
            ? <button className='hover:bg-slate-700 text-neutral-300 block mx-auto transition-colors duration-200 ease-in-out w-[80%] bg-slate-500 p-2 font-bold text-xl text rounded-md mt-4 tracking-wide'>
              Login
            </button>// eslint-disable-line
            : <div className='h-4 w-4 mx-auto'>
              <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z' />
              </svg>
            </div>// eslint-disable-line
          }
        </form>

      </div>
    </main>
  )
}

export default Login
