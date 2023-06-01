import { createContext, useState } from "react";

export const dataContext = createContext();

const DataProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const buyProducts = (menu) => {   
    setCart([...cart, menu]);    
  };

  return <dataContext.Provider value={{ 
      cart, 
      setCart, 
      buyProducts 
    }}>{children}
  </dataContext.Provider>;
};

export default DataProvider;
