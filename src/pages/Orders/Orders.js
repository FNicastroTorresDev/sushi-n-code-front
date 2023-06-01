import React, { useContext,useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOneMenu } from '../../services/menus'
import './orders.css'
import Spinner from '../../components/Spinner/Spinner'
import { dataContext } from "../../Context/DataContext";

const Orders = () => {
  const { buyProducts } = useContext(dataContext);
  const { id } = useParams()
  const [ menu, setMenu ] = useState({})
  const [ isLoading, setIsLoading ] = useState(true)

  const getMenu = async (id) => {
    const menuToShow = await getOneMenu(id)
    setMenu(menuToShow.menu)
    setIsLoading(false)
  }

  useEffect(() => {
    getMenu(id)
  }, [id])

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
              <button className='custom-button link-custom' onClick={() => buyProducts(menu)}>Añadir al carrito</button>              
            </div>                    
          </div>
        </div>
      </section>
    </main>
  )
}

export default Orders