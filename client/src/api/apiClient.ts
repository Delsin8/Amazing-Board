import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.API_URL,
})

apiClient.interceptors.response.use(response => {
  const token = response.headers['authorization']
  if (token) {
    localStorage.setItem('token', token.replace('Bearer ', ''))
  }
  return response
})

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default apiClient
