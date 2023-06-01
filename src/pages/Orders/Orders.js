import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOneMenu } from '../../services/menus'
import { createOrder } from '../../services/orders'
import './orders.css'
import Swal from 'sweetalert2'
import Spinner from '../../components/Spinner/Spinner'
import jwt from 'jwt-decode'

const Orders = () => {
  const { id } = useParams()
  const [ menu, setMenu ] = useState({})
  const [ isLoading, setIsLoading ] = useState(true)
  const user = localStorage.getItem('user')
  const token = localStorage.getItem('accessToken')

  const getMenu = async (id) => {
    const menuToShow = await getOneMenu(id)
    setMenu(menuToShow.menu)
    setIsLoading(false)
  }

  useEffect(() => {
    getMenu(id)
  }, [id])

  const addNewOrder = async () => {
    const newOrder = {
      user: user,
      menu: menu.name
    }

    const { state } = jwt(token)

    if (state === 'Inactivo') {
      Swal.fire({
        icon: 'error',
        title: 'No tiene permitido hacer pedidos',
        text: 'Contacte con nuestros representantes para más información.'
      })
      return
    }

    const createOk = await createOrder(newOrder)

    if (!createOk) {
      Swal.fire({
        icon: 'error',
        title: 'No se pudo crear el pedido',
        text: 'Por favor intente nuevamente.'
      })
    }

    Swal.fire({
      icon:'success',
      title: '¡Pedido creado!',
      showConfirmButton: false,
      timer: 2000
    }).then(() => window.location.replace('/home'))
  }

  if (isLoading) return <Spinner/>
  return (
    <main className='custom-main'>
      <section className='product-detail-container container p-4 mt-5'>

        <p><h3 className='d-flex justify-content-center'>{menu.name}</h3></p>

        <div className='d-flex row contenido'>
          <img src={menu.imgUrl} className='col-4 image' alt={`Foto de ${menu.name}`}/>

          <div className='d-flex flex-column col-8 info'>
            <p className='mt-3'>{menu.details}</p>
                    
            <div className='d-flex align-items-center mx-5 justify-content-end comprar'>
              <p className='mx-3 my-0'>Estado: <b>{menu.state}</b></p>
            <button className='custom-button link-custom' onClick={addNewOrder}>¡Pedir ya!</button>
              
            </div>
                    
          </div>
        </div>
      </section>
    </main>
  )
}

export default Orders