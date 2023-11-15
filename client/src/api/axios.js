import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://deploy-mern-api-orcin.vercel.app/api'
})

export default instance
