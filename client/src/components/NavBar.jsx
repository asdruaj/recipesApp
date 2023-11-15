import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useAuth } from '../context/AuthContext'

function NavBar () {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenUser, setIsOpenUser] = useState(false)
  const { user, signout } = useAuth()
  const navigate = useNavigate()

  const logout = () => {
    signout()
    setIsOpenUser(false)
    navigate('/login')
  }

  return (

    <nav className='mx-auto px-2 bg-gradient-to-t from-neutral-50 to-neutral-400 shadow-[15px_10px_15px_rgba(0,0,0,0.4)]'>
      <div className='container
      mx-auto
      flex
      items-center
      justify-between'
      >

        <Link
          to='/' className='focus:outline-none
        focus-visible:ring-4
        ring-neutral-900
        rounded-sm
        ring-offset-4
        ring-offset-neutral-400
        transition-all
        lg:absolute
        lg:left-1/2
        lg:-translate-x-1/2
        z-50
        hover:opacity-75'
        >
          <img
            className='w-16
            md:w-24 lg:w-32'
            src='/client/assets/logo.svg' alt='Cuisine Logo'
          />
        </Link>

        <div
          role='menubar'
          className={
          `
          ${isOpen ? 'flex' : 'hidden'}
          flex-col
          gap-4
          absolute
          z-40
          right-0
          left-0
          top-11
          md:top-16
          bg-gradient-to-b from-neutral-50 to-neutral-400 
          lg:bg-gradient-to-t
          shadow-2xl
          text-center
          text-lg
          p-6
          items-center
          w-full
          lg:flex
          lg:flex-row
          lg:static
          lg:shadow-none
          lg:justify-between
          lg:w-full
          `
          }
        >
          <Link
            onClick={() => setIsOpen(false)}
            className='
            py-1
            px-6
            dark:text-neutral-900
            focus:outline-none
            focus-visible:ring-4
            ring-neutral-900
            rounded-sm
            ring-offset-4
            ring-offset-neutral-400
            transition-all
            '
            to='/recipes'
          >
            Recipes
          </Link>

          <Link
            onClick={() => setIsOpen(false)}
            className='
            py-1
            px-6
            dark:text-neutral-900
            focus:outline-none
            focus-visible:ring-4
            ring-neutral-900
            rounded-sm
            ring-offset-4
            ring-offset-neutral-400
            transition-all
            '
            to='/store'
          >
            Store
          </Link>

          <Link
            onClick={() => setIsOpen(false)}
            className='
            py-1
            px-6
            dark:text-neutral-900
            focus:outline-none
            focus-visible:ring-4
            ring-neutral-900
            rounded-sm
            ring-offset-4
            ring-offset-neutral-400
            transition-all
            lg:mr-auto'
            to='/about'
          >
            About
          </Link>

          {!user &&
            <>
              <Link
                onClick={() => setIsOpen(false)}
                className='
            py-1
            px-6
            dark:text-neutral-900
            focus:outline-none
            focus-visible:ring-4
            ring-neutral-900
            rounded-sm
            ring-offset-4
            ring-offset-neutral-400
            transition-all
            '
                to='/login'
              >
                Login
              </Link>

              <Link
                onClick={() => setIsOpen(false)}
                to='/register' className='
            py-1
            px-6
            bg-teal-900
            rounded-md
            shadow-xl
            hover:shadow-none
            transition-shadow
            text-neutral-200
            focus:outline-none
            focus-visible:ring-4
            ring-neutral-900
            ring-offset-4
            ring-offset-neutral-400'

              >Sign Up
              </Link>
            </>}

        </div>
        <div className='flex items-center gap-4'>
          <button
            className='lg:hidden
        focus:outline-none
        focus-visible:ring-4
        ring-neutral-900
        rounded-sm
        ring-offset-4
        ring-offset-neutral-400
        text-neutral-800
        hover:text-neutral-600
        transition-colors
        '
            onClick={() => setIsOpen(prevState => !prevState)}
          >
            <Bars3Icon className='w-8 h-8' />
          </button>
          {
              user &&
                <div className='flex justify-center self-end'>
                  <div className='relative'>
                    <button onClick={() => setIsOpenUser(prevState => !prevState)} className='block h-11 w-11 rounded-full overflow-hidden focus:outline-none'>
                      <UserCircleIcon className='h-full w-full object-cover' color='black' />
                    </button>
                    <div className={`${isOpenUser ? '' : 'hidden'} absolute right-0 w-40 mt-2 py-2 z-50 bg-white border rounded shadow-xl`}>
                      <Link
                        onClick={() => setIsOpenUser(false)} to='/profile/recipes'
                        className='transition-colors duration-200 block px-4 py-2  text-gray-900 rounded hover:bg-cyan-800 hover:text-white'
                      >
                        Your Recipes
                      </Link>
                      <div className='py-2'>
                        <hr />
                      </div>

                      <Link
                        onClick={logout}
                        className='transition-colors duration-200 block px-4 py-2  text-gray-900 rounded hover:bg-cyan-800 hover:text-white'
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                </div>
            }
        </div>
      </div>
    </nav>
  )
}

export default NavBar
