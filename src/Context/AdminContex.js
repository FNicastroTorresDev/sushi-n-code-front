import { createContext, useState, useEffect } from "react";
import jwt from 'jwt-decode'
import { allUsers } from '../services/users'
import { allMenues } from '../services/menus'
import { allOrders } from '../services/orders'

export const adminContext = createContext();

const AdminProvider = ({ children }) => {
  const [ userData, setUserData ] = useState([])
  const accessToken = window.localStorage.getItem('accessToken')
  const idUser = jwt(accessToken).id
  const [ isLoading1, setIsLoading1 ] = useState(true);
  const [ isLoading2, setIsLoading2 ] = useState(true);
  const [ isLoading3, setIsLoading3 ] = useState(true);

  const getAllUsers = async (token) => {
    try {
      const { data } = await allUsers(token)
      setUserData(data)
      setIsLoading1(false)
    } catch (err) {
      setUserData([])
    }
  }
 
  const [ menuData, setMenuData ] = useState([])
  
  const getAllMenues = async (token) => {
    try {
      const { data } = await allMenues(token)
      setMenuData(data)
      setIsLoading2(false)
    } catch (err) {
      setMenuData([])
    }
  }

  useEffect(() => {
    getAllUsers(accessToken)
    getAllMenues(accessToken)
    getAllOrders(accessToken)
  }, [])
 
  const [ orderData, setOrderData ] = useState([])
  const getAllOrders = async (token) => {
    try {
      const { data } = await allOrders(token)
      setOrderData(data)
      setIsLoading3(false)
    } catch (err) {
      setOrderData([])
    }
  }

  return <adminContext.Provider value={{ 
    userData,    
    idUser,
    menuData,
    orderData,
    isLoading1,  
    isLoading2,
    isLoading3  
    }}>{children}
  </adminContext.Provider>;
};

export default AdminProvider;