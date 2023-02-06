import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoutes = (props) => {
  console.log(props.loggedIn)
  return props.loggedIn ? <Outlet /> : <Navigate to="/sign-up" />
}

export default ProtectedRoutes
