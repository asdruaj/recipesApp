import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://deploy-mern-api-orcin.vercel.app/api',
  withCredentials: true
})

export default instance
