import { ThemeProvider } from "@mui/material/styles"
import { theme, cacheRTL } from "./theme"
import { CacheProvider } from "@emotion/react"
import { HelmetProvider, Helmet } from "react-helmet-async"
import { useRoutes, useLocation } from "react-router-dom"
import { ProductsProvider } from "./context/ProductContext"
import routes from "./routes"
import { useEffect } from "react"
import { AnimatePresence } from "framer-motion"
export default function App() {
  const location = useLocation()
  const route = useRoutes(routes, location)
  useEffect(() => {}, [])
  return (
    <>
      <CacheProvider value={cacheRTL}>
        <ThemeProvider theme={theme}>
          <ProductsProvider>
            <HelmetProvider>
              <Helmet>
                <title>فروشگاه لورم</title>
              </Helmet>
              <AnimatePresence mode="wait">{route}</AnimatePresence>
            </HelmetProvider>
          </ProductsProvider>
        </ThemeProvider>
      </CacheProvider>
    </>
  )
}
