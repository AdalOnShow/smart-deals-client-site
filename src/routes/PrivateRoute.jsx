import React, { use } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Navigate } from 'react-router'

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext)

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