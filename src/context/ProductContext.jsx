import { useState, createContext } from "react"
import { getCookie } from "../utils"
const isCookieExist = Boolean(getCookie("user-email"))

const ProductsContext = createContext()
export let ProductsProvider = ({ children }) => {
  let [isUserLogin, setIsUserLogin] = useState(isCookieExist)

  return (
    <ProductsContext.Provider
      value={{
        isUserLogin,
        setIsUserLogin,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
export default ProductsContext
