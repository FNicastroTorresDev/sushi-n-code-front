import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './orders.css'

const Producto = () => {
  const params = useParams()
  const [product, setProduct] = useState(null)
  const [cantidad, setCantidad] = useState('1')

  const fetchProduct = async (_id) => {
    const response = await fetch(`http://localhost:8000/api/menues/64518014224b0f59582c50a6`)
    const data = await response.json()
    
    setProduct(data)
  }

  useEffect(() => {
    fetchProduct(params._id)
  }, [params._id])

  if (!product) return <h3 className='text-center mt-3'>Cargando producto...</h3>
  
  
  const data ={
    "user": "",
    "menu": ""
}
   
  const onSubmit = () => {  
    // console.log(product.menu) 
    // data=product
    // data.menu._id="64506cbd8a7b0132694f9957";
    data.menu=product.menu.name;
    data.user= "versace@prueba.com";
    // data.menu.cantidad= parseInt(cantidad);
    // data.menu.total=parseInt(cantidad)*data.menu.price;
    
    // data.menu.name=product.menu.name
    console.log(data)  
    createOrder(data)
  }

  const createOrder = async(data) => {
    try {
      const response = await fetch('http://localhost:8000/api/orders', {
      method: 'POST',
      // body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/jon'
      }
    });
    const body =await response.json()
    console.log(body)
    } catch (error) {
      console.log(error)
    }
  }

  return (     
           
      <section className='product-detail-container container p-4 my-5 custom-main'>
        <p><h3 className='d-flex justify-content-center'> {product.menu.name} </h3></p>

        <div className='d-flex row contenido'>
          <img src={product.menu.imgUrl} className='col-4 image' alt={product.menu.name}/>

          <div className='d-flex flex-column col-8 info'>
            <p> {product.menu.details} </p>
            <span class="badge bg-secondary col-2"> {product.menu.category} </span>
            {/* <h4 className='mt-3'>${product.menu.price}</h4> */}
            <h4 className='mt-3'>${ cantidad===1 ? product.menu.price*1 : product.menu.price*parseInt(cantidad)}</h4>
       
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

              <button className='btn btn-outline-success m-0' type='submit'  onClick={onSubmit}> Realizar Pedido</button>
              
            </div>                    
          </div>
        </div>
    </section>    
  )
}

export default Producto