import { Navigate, Outlet } from "react-router-dom";
import { validateToken } from "../../services/login";
import { useEffect, useState } from "react";

export const ProtectedRoute = ({ redirectTo="/login" }) => {
  const token = window.localStorage.getItem('accessToken')
  const [ isValid, setIsValid ] = useState()

  useEffect( () => {
    const validate = async () => {
      const valTok = await validateToken(token)
      setIsValid(valTok)
    }
    validate()
  }, [token])

  if (!token) {
    return <Navigate to={redirectTo} />
  }
  
  if (isValid?.error) {
    console.log(isValid?.error)
    window.localStorage.clear('accessToken')
    return <Navigate to={redirectTo} />
  }

  console.log(isValid?.message)
  return <Outlet />
}