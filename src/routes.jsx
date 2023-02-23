import {
  CartPage,
  Index,
  NotFound,
  ProductInfo,
  PrivateRoute,
  AdminOrders,
  AdminProducts,
  Checkout,
  CustomCategory,
} from "./components"
const routes = [
  { path: "/", element: <Index /> },
  { path: "*", element: <NotFound /> },
  { path: "/category/:categoryID", element: <CustomCategory /> },
  { path: "product/:productID", element: <ProductInfo /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/checkout", element: <Checkout /> },
  {
    path: "/admin/*",
    element: <PrivateRoute />,
    children: [
      { path: "products", element: <AdminProducts /> },
      { path: "orders", element: <AdminOrders /> },
    ],
  },
]
export default routes
