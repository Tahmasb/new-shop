import { ThemeProvider } from "@mui/material/styles"
import { theme, cacheRTL } from "./theme"
import { CacheProvider } from "@emotion/react"
import { HelmetProvider, Helmet } from "react-helmet-async"
import { useRoutes } from "react-router-dom"
import { ProductsProvider } from "./context/ProductContext"
import routes from "./routes"
import { useEffect } from "react"
export default function App() {
  const route = useRoutes(routes)
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
              {route}
            </HelmetProvider>
          </ProductsProvider>
        </ThemeProvider>
      </CacheProvider>
    </>
  )
}
