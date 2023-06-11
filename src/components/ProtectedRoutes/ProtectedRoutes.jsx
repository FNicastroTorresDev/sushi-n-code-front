import { Navigate, Outlet } from "react-router-dom";
import { validateToken } from "../../services/login";
import { useEffect, useState } from "react";

export const ProtectedRoute = ({ redirectTo="/landing"}) => {
  const token = window.localStorage.getItem('accessToken')
  const [ isValid, setIsValid ] = useState()

  const validate = async () => {
    if (!token) {
      return
    }

    try {
      const valTok = await validateToken(token)
      setIsValid(valTok)
    } catch (err) {
      setIsValid('invalid')
    }
  }

  useEffect( () => {
    validate()
  }, [])

  if (!token) {
    return <Navigate to={redirectTo} />
  }
  
  if (isValid === 'invalid') {
    window.localStorage.clear('accessToken')
    return <Navigate to={redirectTo} />
  }

  return <Outlet />
}