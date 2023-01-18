import { useContext } from "react"
import ProductsContext from "../../context/ProductContext"
import "./privateRoute.css"
import { Helmet } from "react-helmet-async"
import { Divider, Grid, Typography } from "@mui/material"
import { Link, Navigate, NavLink, Outlet } from "react-router-dom"
export default function PrivateRoute({ children }) {
  const context = useContext(ProductsContext)
  return (
    <Grid>
      <Helmet>
        <title> پنل ادمین</title>
      </Helmet>
      <Grid
        pt={2}
        className="private-header"
        p={2.3}
        display="flex"
        // columnGap={5}
        justifyContent="space-between"
      >
        <Typography sx={{ display: { xs: "none", md: "flex" } }} variant="h6">
          پنل مدیریت فروشگاه
        </Typography>
        <Grid
          display="flex"
          border={1}
          p={0.6}
          columnGap={1}
          borderColor={"blue"}
          borderRadius={"5px"}
        >
          <NavLink
            className={(link) => (link.isActive ? "active" : "")}
            to={"products"}
          >
            محصولات
          </NavLink>
          <Divider orientation="vertical" />
          <NavLink to={"orders"}>سفارش‌ها</NavLink>
        </Grid>

        <Link className="back-to-main" to="/">
          بازگشت به سایت
        </Link>
      </Grid>
      {context.isUserLogin ? <> {children} </> : <Navigate to={"/"} />}
      <Outlet />
    </Grid>
  )
}
