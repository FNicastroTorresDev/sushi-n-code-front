import React, { useState } from 'react'
import AdminUsers from '../../components/AdminUsers/AdminUsers'
import AdminMenues from '../../components/AdminMenues/AdminMenues'
import AdminOrders from '../../components/AdminOrders/AdminOrders'
import RegisterForm from '../../components/RegisterForm/RegisterForm'
import AddMenuForm from '../../components/AddMenuForm/AddMenuForm'
import EditMenuForm from '../../components/EditMenuForm/EditMenuForm'

const Admin = () => {
  const [ modalIsOpen, setModalIsOpen ] = useState(false)
  const [ idMenu, setIdMenu ] = useState({})

  return (
    <>
      <main className='my-2 d-flex flex-column align-items-center container'>
        <AdminUsers />

        <AdminMenues setModalIsOpen={setModalIsOpen} setIdMenu={setIdMenu} />

        <AdminOrders />
      </main>

      <RegisterForm />

      <AddMenuForm />

      <EditMenuForm idMenu={idMenu} />
    </>
  )
}

export default Admin