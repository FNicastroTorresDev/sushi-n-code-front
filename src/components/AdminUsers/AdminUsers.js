import React, { useState, useContext } from 'react'
import './adminUsers.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { enableDisable } from '../../services/users'
import Swal from 'sweetalert2'
import Spinner from '../Spinner/Spinner'
import { adminContext } from "../../Context/AdminContex";

const AdminUsers = () => {
  
  const { userData } = useContext(adminContext);
  const { idUser } = useContext(adminContext);
  const { isLoading1 } = useContext(adminContext);

  const changeState = async ({ target: {id, title} }) => {
    Swal.fire({
      icon: 'question',
      title: `¿${title} usuario?`,
      confirmButtonText: `Sí`,
      showCancelButton: true,
      cancelButtonText: `Cancelar`,
    }).then( async result => {
      if (result.isConfirmed) {
        await enableDisable(id, title)
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
    <div className='table-responsive tabla container'>
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
        {isLoading1 ? <Spinner/> : null }

        {userData.map( user => (
          <tr>
            <th scope='row'>{user.email}</th>
            <td>{user.fullname}</td>
            <td>{user.state}</td>
            <td>{user.role}</td>
            <td>
              {user._id === idUser 
                ? <i class="bi bi-person" title='Usuario actual'></i>
                : <i id={user._id} {
                  ...user.state === 'Activo'
                  ? { title: 'Inhabilitar', className: 'bi bi-person-slash' }
                  : { title: 'Habilitar', className: 'bi bi-person-check' }
                  } onClick={changeState} ></i>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    
  )
}

export default AdminUsers