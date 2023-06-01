import { useContext } from "react";
import { dataContext } from "../../Context/DataContext";

const TotalItems = () => {
  const { cart } = useContext(dataContext);

  const itemsQuanty = cart.reduce((acc, el) => acc + 1, 0);
  return <span className='text-white d-flex'>{itemsQuanty}</span>;
};

export default TotalItems;
