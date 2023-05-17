import React, { useState, useEffect } from 'react'
import './adminUsers.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { allUsers, enableDisable } from '../../services/users'
import Swal from 'sweetalert2'

const AdminUsers = () => {

  const [ userData, setUserData ] = useState([])
  const accessToken = window.localStorage.getItem('accessToken')

  const getAllUsers = async (token) => {
    const { data } = await allUsers(token)
    setUserData(data)
  }

  useEffect(() => {
    getAllUsers(accessToken)
    console.log(userData)
  }, [])
  
  const changeState = async ({ target: {id, title} }) => {
    Swal.fire({
      icon: 'question',
      title: `¿${title} usuario?`,
      confirmButtonText: `Sí`,
      showCancelButton: true,
      cancelButtonText: `Cancelar`,
    }).then( async result => {
      if (result.isConfirmed) {
        await enableDisable(id, title, accessToken)
        Swal.fire({
          icon:'success',
          title: `Cambio realizado`,
          showConfirmButton: false,
          timer: 1500
        }).then( () => window.location.reload() )
      }
    })
  }

  return (
    <table className='my-3 table table-striped table-hover'>
      <caption className='top fs-3 fw-bold'>
        Usuarios <i title='Crear nuevo Usuario' className="bi bi-plus-square" data-bs-toggle="modal" data-bs-target="#register-form"></i>
      </caption>
      <thead>
        <tr>
          <th scope="col">Email</th>
          <th scope="col">Nombre</th>
          <th scope="col">Estado</th>
          <th scope="col">Rol</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody className='table-group-divider'>
        {userData.map( user => (
          <tr>
            <th data-titulo= "email">{user.email}</th>
            <td data-titulo="Nombre Completo">{user.fullname}</td>
            <td data-titulo="Estado">{user.state}</td>
            <td data-titulo="Rol">{user.role}</td>
            <td>
              <i id={user._id} {
                ...user.state === 'Activo'
                ? { title: 'Inhabilitar', className: 'bi bi-person-slash' }
                : { title: 'Habilitar', className: 'bi bi-person-check' }
                } onClick={changeState} ></i>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default AdminUsers