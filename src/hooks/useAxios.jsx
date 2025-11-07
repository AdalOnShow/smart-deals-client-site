import axios from "axios"
import useAuth from "./useAuth"
import { useEffect } from "react"
import { useNavigate } from "react-router"

const axiosInstance = axios.create({
  baseURL: 'https://smart-deals-server-sigma-beige.vercel.app'
})

const useAxios = () => {
  const { user, signOutFunc } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {

    // request interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use((config) => {
      const token = user?.accessToken
      if (token) {
        config.headers.authorization = `Bearer ${token}`
      }
      return config
    })

    // response interceptor
    const responseInterceptor = axiosInstance.interceptors.response.use((response) => {
      return response
    }, (error) => {
      const status = error.response.status
      if (status === 403 || status === 401) {
        signOutFunc()
          .then(() => {
            navigate('/login')
          })
      }
    })

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor)
      axiosInstance.interceptors.request.eject(responseInterceptor)
    }
  }, [user, signOutFunc, navigate])


  return axiosInstance;
}

export default useAxios