import { useContext } from "react";
import { dataContext } from "../../Context/DataContext";
import Cart from "../../pages/Cart/Cart" ;
import CartElements from "./CartElements";
import CartTotal from "./CartTotal";

import "./CartContent.css";

const CartContent = () => {
  const { cart } = useContext(dataContext);

  return (
    <>
      {cart.length > 0 ? (
        <>
          <div className='custom-main '>
            <div >
              <CartElements />
            </div>
            
            <div className=''>
              <CartTotal />
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
