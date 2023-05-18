import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOneMenu } from '../../services/menus'
import { createOrder } from '../../services/orders'
import './orders.css'
import Swal from 'sweetalert2'

const Orders = () => {
  const { id } = useParams()
  const [ menu, setMenu ] = useState(null)
  const user = localStorage.getItem('user')

  const getMenu = async (id) => {
    const menuToShow = await getOneMenu(id)

    setMenu(menuToShow.menu)
  }

  useEffect(() => {
    getMenu(id)
  }, [id])

  const addNewOrder = async () => {
    const newOrder = {
      user: user,
      menu: menu.name
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

  if (!menu) return <h2 className='custom-main d-flex justify-content-center align-items-center text-center mt-3'>Cargando menú...</h2>

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
              {/* <h5 className='my-0'> Cantidad 
              </h5>
              <select className="form-select mx-3" aria-label="Default select example">              
                <option value="1" selected>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select> */}
            <button className='custom-button link-custom' onClick={addNewOrder}>¡Pedir ya!</button>
              
            </div>
                    
          </div>
        </div>
      </section>
    </main>
  )
}

export default Orders