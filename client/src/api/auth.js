import axios from './axios.js'

export const registerRequest = user => axios.post('deploy-mern-api-orcin.vercel.app
/register', user)

export const loginRequest = user => axios.post('deploy-mern-api-orcin.vercel.app
/login', user)

export const logOutRequest = () => axios.post('deploy-mern-api-orcin.vercel.app
/logout')

export const verifyTokenRquest = () => axios.get('deploy-mern-api-orcin.vercel.app
/verify')
