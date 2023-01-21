import { useState, createContext } from "react"
import { getCookie } from "../utils"
const isCookieExist = Boolean(getCookie("user-email"))

const ProductsContext = createContext()
export let ProductsProvider = ({ children }) => {
  let [products, setProducts] = useState([])
  let [cartItems, setCartItems] = useState([])
  let [favorite, setFavorite] = useState([])
  let [nextList, setNextList] = useState([])
  let [isUserLogin, setIsUserLogin] = useState(isCookieExist)

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
        setIsUserLogin,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
export default ProductsContext
