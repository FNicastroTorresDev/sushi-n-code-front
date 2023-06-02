import { useContext } from "react";
import { dataContext } from "../../Context/DataContext";
import Cart from "../../pages/Cart/Cart" ;
import CartElements from "./CartElements";
import CartTotal from "./CartTotal";

import "./CartContent.css";

import { createOrder } from '../../services/orders'
import Swal from 'sweetalert2'
import jwt from 'jwt-decode'


const CartContent = () => {
  const { cart } = useContext(dataContext);
  const user = localStorage.getItem('user')
  const token = localStorage.getItem('accessToken')
  
  const addNewOrder = async () => {

    const newOrder = {
      user: user,
      menu: cart[0].name
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

  return (
    <>
      {cart.length > 0 ? (
        <>
          <div className='custom-main '>
            <div >
              <CartElements />
            </div>
            
            <div className='d-flex justify-content-center align-items-center flex-column' >
              <CartTotal />
              <button className='custom-button link-custom ' onClick={addNewOrder}>¡Pedir ya!</button>
            </div>
             
          </div>
          
        </>
      ) : (
        <Cart/>        
      )}
    </>
  );
};

export default CartContent;
