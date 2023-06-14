import React, { useEffect } from 'react'
import AdminUsers from '../../components/AdminUsers/AdminUsers'
import AdminMenues from '../../components/AdminMenues/AdminMenues'
import AdminOrders from '../../components/AdminOrders/AdminOrders'
import RegisterForm from '../../components/RegisterForm/RegisterForm'
import AddMenuForm from '../../components/AddMenuForm/AddMenuForm'
import { validateToken } from '../../services/login'
import AdminProvider from '../../Context/AdminContex';


const Admin = () => {

  const token = window.localStorage.getItem('accessToken')

  useEffect( () => {
    async function  validate() {
      try {
        await validateToken(token)
      } catch (err) {
        window.localStorage.clear('accessToken')
        window.location.replace('/login')
      }
    }

    validate()
  }, [])

  return (
    <>
      <AdminProvider>
        <main className='my-2 d-flex flex-column align-items-center'>
          <AdminUsers />

          <AdminMenues />

          <AdminOrders />
        </main>

        <RegisterForm />

        <AddMenuForm />
      </AdminProvider>
      
    </>
  )
}

export default Admin