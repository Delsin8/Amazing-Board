import { AppDispatch } from 'app/store'
import axios from 'axios'
import { setUser } from '../features/user/userSlice'
import { jwtDecode } from 'jwt-decode'
import { IUser } from '../types/commonTypes'

const apiClient = axios.create({
  baseURL: process.env.API_URL,
})

export const handleTokenInInterceptor = (dispatch: AppDispatch) => {
  let firstRequest = true

  apiClient.interceptors.response.use(
    response => {
      const newToken = response.headers['authorization']?.replace('Bearer ', '')
      const currentToken = localStorage.getItem('token')

      if (newToken && (newToken !== currentToken || firstRequest)) {
        localStorage.setItem('token', newToken)
        const decoded = jwtDecode<IUser>(newToken)
        dispatch(setUser({ token: newToken, user: decoded }))
      }

      firstRequest = false

      return response
    },
    error => {
      return Promise.reject(error)
    }
  )
}

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default apiClient
