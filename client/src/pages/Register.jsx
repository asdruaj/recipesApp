import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'

function Register () {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signup, user, errors: authErrors, setErrors } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = handleSubmit((user) => {
    setIsLoading(true)
    signup(user)
    setIsLoading(false)
  })

  useEffect(() => {
    setErrors({ login: [] })
  }, [])

  useEffect(() => {
    if (user) navigate('/recipes', { replace: true })
  }, [user])

  useEffect(() => {
    authErrors.signup?.map(error => toast.error(error.message))
  }, [authErrors])

  return (
    <main className='grid place-content-center h-[calc(100vh-100px)]'>
      <div className=' bg-slate-300/75 p-8 max-w-md m-4 rounded-md border border-slate-500 shadow-2xl '>
        <h1 className='text-neutral-800 text-2xl font-bold mb-4 tracking-wide'>Register</h1>
        <Toaster richColors theme='system' />

        <form onSubmit={onSubmit}>
          <label className='text-lg font-semibold text-neutral-800' htmlFor='username'>Username</label>
          <input id='username' className='w-full my-2 bg-slate-500 rounded-sm px-4 py-2' placeholder='ThisIsMyUsername1995 ' type='text' {...register('username', { required: true })} />
          {
            errors.username?.type === 'required' && <p className='text-red-500 w-full inline-block'> Username is Required</p>
          }
          <label className='text-lg font-semibold text-neutral-800' htmlFor='email'>E-mail</label>
          <input id='email' className='w-full my-2 bg-slate-500 rounded-sm px-4 py-2' type='email' placeholder='thisismyemail@email.com' {...register('email', { required: true })} />
          {
            errors.email?.type === 'required' && <p className='text-red-500'> Email is Required</p>
          }
          <label className='text-lg font-semibold text-neutral-800' htmlFor='password'>Password</label>
          <input placeholder='••••••••••' id='password' className='w-full my-2 bg-slate-500 rounded-sm px-4 py-2' type='password' {...register('password', { required: true })} />
          {
            errors.password?.type === 'required' && <p className='text-red-500'> Password is Required</p>
          }

          <button className='hover:bg-slate-600 block mx-auto transition-colors duration-200 ease-in-out w-[80%] bg-slate-500 p-2 font-bold text-xl text rounded-md mt-4 tracking-wide'>Register</button>
        </form>

      </div>
    </main>
  )
}

export default Register
