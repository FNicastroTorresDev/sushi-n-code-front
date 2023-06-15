import React, { useContext } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { changeToDelivered } from '../../services/orders'
import Swal from 'sweetalert2'
import Spinner from '../Spinner/Spinner'
import { adminContext } from "../../Context/AdminContex";

const AdminOrders = () => {
  const { orderData } = useContext(adminContext);
  const { isLoading3 } = useContext(adminContext);

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
    <div className='table-responsive tabla container'>
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
          {isLoading3 ? <Spinner/> : null }

          {orderData.map( order => (
            <tr>
              <th scope='row'>{order.user}</th>
              <td>{order.menu}</td>
              <td>{order.date}</td>
              <td>{order.state}</td>
              <td id={order._id}>
                {order.state === 'Pendiente'
                ? <i title='Confirmar entrega' className="bi bi-check-lg" onClick={confirmDelivery}></i>
                : <i title='¡Realizado!' className="bi bi-bag-check"></i>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  )
}

export default AdminOrders