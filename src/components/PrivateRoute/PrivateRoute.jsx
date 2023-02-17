import "./privateRoute.css"
import { Helmet } from "react-helmet-async"
import { Divider, Grid, Typography } from "@mui/material"
import { Link, Navigate, NavLink, Outlet } from "react-router-dom"
import { getCookie } from "../../utils"
export default function PrivateRoute({ children }) {
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
        bgcolor={"#0099ff"}
        justifyContent="space-between"
      >
        <Typography
          color="white"
          sx={{ display: { xs: "none", md: "flex" } }}
          variant="h6"
        >
          پنل مدیریت فروشگاه
        </Typography>
        <Grid
          display="flex"
          border={2}
          p={0.6}
          columnGap={1}
          borderColor={"white"}
          borderRadius={"5px"}
        >
          <NavLink
            className={(link) => (link.isActive ? "active" : "")}
            to={"products"}
          >
            محصولات
          </NavLink>
          <Divider sx={{ bgcolor: "white" }} orientation="vertical" />
          <NavLink to={"orders"}>سفارش‌ها</NavLink>
        </Grid>

        <Link className="back-to-main" to="/">
          بازگشت به سایت
        </Link>
      </Grid>
      {Boolean(getCookie("user-email")) ? (
        <> {children} </>
      ) : (
        <Navigate to={"/"} />
      )}
      <Outlet />
    </Grid>
  )
}
