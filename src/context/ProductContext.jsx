import { isLogin } from "../utils"
import { useState, createContext } from "react"
const ProductsContext = createContext()
export let ProductsProvider = ({ children }) => {
  let [products, setProducts] = useState([])
  let [cartItems, setCartItems] = useState([])
  let [favorite, setFavorite] = useState([])
  let [nextList, setNextList] = useState([])
  let [isUserLogin, setIsUserLogin] = useState(isLogin("mojtaba"))

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        cartItems,
        setCartItems,
        favorite,
        setFavorite,
        nextList,
        setNextList,
        isUserLogin,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
export default ProductsContext
