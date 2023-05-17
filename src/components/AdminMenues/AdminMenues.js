import React, { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { allMenues, deleteOneMenu, getOneMenu } from '../../services/menus'
import Swal from 'sweetalert2'

const AdminMenues = ({ setModalIsOpen, setIdMenu }) => {
  const [ menuData, setMenuData ] = useState([])
  const accessToken = window.localStorage.getItem('accessToken')

  const getAllMenues = async (token) => {
    const { data } = await allMenues(token)
    setMenuData(data)
  }

  useEffect(() => {
    getAllMenues(accessToken)
  }, [])

  const deleteMenu = async ({ target }) => {
    const id = target.parentNode.id

    Swal.fire({
      icon: 'question',
      title: `¿Está seguro?`,
      text: 'Esta acción no se puede deshacer.',
      confirmButtonText: `Sí`,
      showCancelButton: true,
      cancelButtonText: `Cancelar`,
    }).then( async result => {
      if (result.isConfirmed) {
        const deleted = await deleteOneMenu(id)

        if (deleted.error) {
          Swal.fire({
            icon: 'error',
            title: `${deleted.error}`
          })
        }

        Swal.fire({
          icon:'success',
          title: `${deleted.message}`,
          showConfirmButton: false,
          timer: 1500
        }).then( () => window.location.reload())
      }
    })
  }

  const menuToEdit = ({ target }) => {
    const id = target.parentNode.id
    // setModalIsOpen(true)
    setIdMenu(id)
  }

  return (
    <table className='my-3 table table-striped table-hover'>
      <caption className='top fs-3 fw-bold'>
        Menús <i title='Crear nuevo Menú' className="bi bi-plus-square" data-bs-toggle="modal" data-bs-target="#addMenu-form"></i></caption>
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Imagen</th>
          <th scope="col">Estado</th>
          <th scope="col">Precio</th>
          <th scope="col">Detalles</th>
          <th scope="col">Categoría</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody className='table-group-divider'>
        {menuData.map( menu => (
          <tr>
            <th scope='row'>{menu.name}</th>
            <td><a href={menu.imgUrl} target='_blank' rel='noreferrer'>Ver Imagen</a></td>
            <td data-titulo="Estado">{menu.state}</td>
            <td data-titulo="Precio">${menu.price}</td>
            <td data-titulo="Detalle">{menu.details}</td>
            <td data-titulo="Categoria">{menu.category}</td>
            <td id={menu._id}>
              <i title='Modificar' className="bi bi-pen" data-bs-toggle="modal" data-bs-target="#editMenu-form" onClick={menuToEdit}></i>
              <i title='Eliminar' className="bi bi-trash ms-3" onClick={deleteMenu}></i>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default AdminMenues