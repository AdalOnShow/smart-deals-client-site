import { Navigate } from 'react-router'
import useAuth from '../hooks/useAuth'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (user) {
    return children
  }
  else if (loading) {
    return <div>Loading...</div>
  }
  else {
    return <Navigate to="/login" />
  }
}

export default PrivateRoute