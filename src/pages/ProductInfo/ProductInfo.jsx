import { Footer, Header, ProductDetails } from "../../components"
import { Helmet } from "react-helmet-async"
export default function ProductInfo() {
  return (
    <>
      <Helmet>
        <title>صفحه محصول</title>
      </Helmet>
      <Header />
      <ProductDetails />
      <Footer />
    </>
  )
}
