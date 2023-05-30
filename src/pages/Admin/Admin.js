import React from 'react'
import AdminUsers from '../../components/AdminUsers/AdminUsers'
import AdminMenues from '../../components/AdminMenues/AdminMenues'
import AdminOrders from '../../components/AdminOrders/AdminOrders'
import RegisterForm from '../../components/RegisterForm/RegisterForm'
import AddMenuForm from '../../components/AddMenuForm/AddMenuForm'

const Admin = () => {
  return (
    <>
      <main className='my-2 d-flex flex-column align-items-center'>
        <AdminUsers />

        <AdminMenues />

        <AdminOrders />
      </main>

      <RegisterForm />

      <AddMenuForm />
    </>
  )
}

export default Admin