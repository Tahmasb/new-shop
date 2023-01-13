import {
  Grid,
  TextField,
  Typography,
  InputAdornment,
  Badge,
  Tooltip,
  Modal,
} from "@mui/material"
import { Login, Product } from "./../"
import { Link } from "react-router-dom"
import { FaReact } from "react-icons/fa"
import { BsCart, BsSearch } from "react-icons/bs"
import { AiOutlineUser } from "react-icons/ai"
import "./header.css"
import * as React from "react"
import ProductsContext from "../../context/ProductContext"
import { useLocation } from "react-router-dom"

export default function Header() {
  let location = useLocation()
  const [inputValue, setInputValue] = React.useState("")
  const [themState, setThemState] = React.useState(true)
  let localStorageCart =
    JSON.parse(window.localStorage.getItem("cart-items")) || []
  const context = React.useContext(ProductsContext)
  let [loginModal, setLoginModal] = React.useState(false)
  const [searchResult2, setSearchResult2] = React.useState([])

  const searchProduct = (e) => {
    setSearchResult2(
      JSON.parse(window.localStorage.getItem("all-products"))
        .filter((product) => {
          return product.title.includes(e)
        })
        .slice(0, 5)
    )
  }
  React.useEffect(() => {
    setInputValue("")
  }, [location.pathname])
  React.useEffect(() => {
    searchProduct(inputValue || "$$$")
  }, [inputValue])
  return (
    <>
      <Grid
        display="flex"
        alignItems="center"
        py={1.3}
        justifyContent="space-between"
        className="header-background"
        sx={{ bgcolor: "" }}
      >
        <Modal
          open={loginModal}
          onClose={() => {
            setLoginModal(false)
          }}
        >
          <>
            <Login />
          </>
        </Modal>
        <Grid
          justifyContent={"space-evenly"}
          alignItems="center"
          display={"flex"}
          sx={{ flex: { lg: 0.6, md: 0.9 } }}
        >
          <Tooltip title="برو صفحه اصلی">
            <Link
              to="/"
              style={{
                display: "flex",
                marginRight: "1.3rem",
                marginLeft: ".8rem",
              }}
            >
              <FaReact className="bolder" />
            </Link>
          </Tooltip>
          <Typography
            onClick={() => {
              setThemState(!themState)
              themState
                ? document.documentElement.style.setProperty(
                    "--lightGray",
                    "darkcyan"
                  )
                : document.documentElement.style.setProperty(
                    "--lightGray",
                    "lightgray"
                  )
            }}
            sx={{ display: { xs: "none", md: "flex" } }}
            variant="h6"
          >
            فروشگاه لورم
          </Typography>
        </Grid>
        <Grid flex={3}>
          <TextField
            fullWidth
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
            }}
            placeholder="جستجو ..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BsSearch className="bold" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid
          display="flex"
          sx={{
            flex: { md: 0.7, xs: 1.2 },
            justifyContent: { xs: "space-around", sm: "space-around" },
          }}
        >
          <Tooltip title="پنل ادمین">
            <Link
              to={context.isUserLogin && "/admin/products"}
              onClick={() => {
                setLoginModal(true)
              }}
            >
              <AiOutlineUser className="bolder" />
            </Link>
          </Tooltip>
          <Link to={"/cart"}>
            <Tooltip title="برو تو سبد خرید">
              <Badge
                badgeContent={localStorageCart.length || 0}
                color="success"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <BsCart className="bold" />
              </Badge>
            </Tooltip>
          </Link>
        </Grid>
      </Grid>
      <Grid container sx={{ bgcolor: "lightgreen" }}>
        {searchResult2.map((product, index) => (
          <Product key={index} numShow={3} productTitle={product.title} />
        ))}
      </Grid>
    </>
  )
}
