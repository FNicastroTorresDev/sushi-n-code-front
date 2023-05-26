import { Navigate, Outlet } from "react-router-dom";
import { validateToken } from "../../services/login";
import { useEffect, useState } from "react";

export const ProtectedRoute = ({ redirectTo="/login"}) => {
  const token = window.localStorage.getItem('accessToken')
  const [ isValid, setIsValid ] = useState()

  useEffect( () => {
    const validate = async () => {
      try {
        const valTok = await validateToken(token)
        setIsValid(valTok)
      } catch (err) {
        setIsValid('invalid')
      }
    }
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