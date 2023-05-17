import React, { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { allOrders, changeToDelivered } from '../../services/orders'
import Swal from 'sweetalert2'

const AdminOrders = () => {
  const [ orderData, setOrderData ] = useState([])
  const accessToken = window.localStorage.getItem('accessToken')

  const getAllOrders = async (token) => {
    const { data } = await allOrders(token)
    setOrderData(data)
  }

  useEffect(() => {
    getAllOrders(accessToken)
  }, [])

  const confirmDelivery = async ({ target }) => {
    const id = target.parentNode.id

    Swal.fire({
      title: '¿Confirmar entrega?',
      text: '¡No podrás revertir esto!',
      icon: 'info',
      showCancelButton: true
    }).then( async result => {
      if (result.isConfirmed) {
        await changeToDelivered(id)
        Swal.fire({
          title: '¡Cambio realizado!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        }).then( () => window.location.reload() )
      }
    })
  }

  return (
    <table className='my-3 table table-striped table-hover'>
      <caption className='top fs-3 fw-bold'>Pedidos</caption>
      <thead>
        <tr>
          <th scope="col">Usuario</th>
          <th scope="col">Menu</th>
          <th scope="col">Fecha y hora</th>
          <th scope="col">Estado</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody className='table-group-divider'>
        {orderData.map( order => (
          <tr>
            <th scope='row'>{order.user}</th>
            <td data-titulo="Menu">{order.menu}</td>
            <td data-titulo="Fecha y Hora">{order.date}</td>
            <td data-titulo="Estado">{order.state}</td>
            <td id={order._id}>
              {order.state === 'Pendiente'
              ? <i title='Confirmar entrega' className="bi bi-check-lg" onClick={confirmDelivery}></i>
              : <i title='¡Realizado!' className="bi bi-bag-check"></i>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default AdminOrders