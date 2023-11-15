import React from 'react'
import { useAuth } from './context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoutes () {
  const { user } = useAuth()

  return (
    user ? <Outlet /> : <Navigate to='/login' />
  )
}

export default PrivateRoutes
