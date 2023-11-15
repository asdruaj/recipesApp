import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://mern-recipe-app-api-jzzq.onrender.com/api'
})

export default instance
