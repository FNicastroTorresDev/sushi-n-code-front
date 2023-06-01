import { useContext } from "react";
import { dataContext } from "../../Context/DataContext";

const CartTotal = () => {
  const { cart } = useContext(dataContext);

  const total = cart.reduce((acc, el) => acc + el.price, 0);
  return (
    <div className='d-flex justify-content-center'>
      <h3>Total a Pagar: {total} $</h3>
    </div>
  );
};

export default CartTotal;
