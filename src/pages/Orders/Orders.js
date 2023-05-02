import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './orders.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

const Producto = () => {
  const params = useParams()
  const [product, setProduct] = useState(null)
  const [ setCantidad] = useState('1')

  const fetchProduct = async (_id) => {
    const response = await fetch(`http://localhost:8000/api/menues/64518014224b0f59582c50a6`)
    const data = await response.json()
    
    setProduct(data)
  }
  // console.log(product.menu)
  useEffect(() => {
    fetchProduct(params._id)
  }, [params._id])

  if (!product) return <h3 className='text-center mt-3'>Cargando producto...</h3>

  return (
    <>
       <Navbar />
      <section className='product-detail-container container p-4 mt-5 custom-main'>
        <p><h3 className='d-flex justify-content-center'> {product.menu.name} </h3></p>

        <div className='d-flex row contenido'>
          <img src={product.menu.imgUrl} className='col-4 image' alt={product.menu.name}/>

          <div className='d-flex flex-column col-8 info'>
            <p> {product.menu.details} </p>
            <span class="badge bg-secondary col-2"> {product.menu.category} </span>
            <h4 className='mt-3'>${product.menu.price}</h4>
                    
            <div className='d-flex align-items-center mx-5  justify-content-end comprar'>
              <p className='mx-3 my-0'> Hay {product.menu.state} 
                  !! 
              </p>
              <h5 className='my-0'> Cantidad 
              </h5>
              <select className="form-select mx-3" aria-label="Default select example" onChange={(event) => setCantidad(event.target.value)}>              
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
              </select>

              <button className='btn btn-outline-success m-0'> Realizar Pedido</button>
              
            </div>                    
          </div>
        </div>
    </section>
    <Footer />
    </>
    
  )
}

export default Producto