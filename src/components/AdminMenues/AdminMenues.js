import React, { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { allMenues, deleteOneMenu, getOneMenu } from '../../services/menus'
import Swal from 'sweetalert2'
import Spinner from '../Spinner/Spinner'
import EditMenuModal from '../EditMenuModal/EditMenuModal'

const AdminMenues = () => {
  const [ menuData, setMenuData ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)
  const accessToken = window.localStorage.getItem('accessToken')

  const [ menuToEdit, setMenuToEdit ] = useState()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const getAllMenues = async (token) => {
    const { data } = await allMenues(token)
    setMenuData(data)
    setIsLoading(false)
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

  const handleEditModal = async ({ target }) => {
    const id = target.parentNode.id
    const menu = await getOneMenu(id)
    setMenuToEdit(menu)
    handleShow()
  }

  return (
    <>
      <div className='table-responsive container'>
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
            {isLoading ? <tr><Spinner/></tr> : null }

            {menuData.map( menu => (
              <tr>
                <th scope='row'>{menu.name}</th>
                <td><a href={menu.imgUrl} target='_blank' rel='noreferrer'>Ver Imagen</a></td>
                <td>{menu.state}</td>
                <td>${menu.price}</td>
                <td>{menu.details}</td>
                <td>{menu.category}</td>
                <td id={menu._id}>
                  <i title='Modificar' className="bi bi-pen" onClick={handleEditModal}></i>
                  <i title='Eliminar' className="bi bi-trash ms-3" onClick={deleteMenu}></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      

      <EditMenuModal show={show} handleClose={handleClose} menuToEdit={menuToEdit} />
    </>
  )
}

export default AdminMenues