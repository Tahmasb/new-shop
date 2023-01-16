import { CardMedia, Grid, Typography } from "@mui/material"
import { useContext, useEffect } from "react"
import { ProductsContext, CartTemplate, Header } from ".."
import styles from "./test.module.css"
// import emptyCart from "./../../assets/img/empty-cart.png"
import { styled } from "@mui/system"
import React from "react"
import {
  formatCurrency,
  removeFavorite,
  removeProduct,
  removeNextList,
} from "./../../utils"
import { useNavigate } from "react-router-dom"
const GridCus = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  row-gap: 0.7rem;
`
const TypographyCus = styled(Typography)`
  text-align: center;
  margin-top: 1.7rem;
  margin-bottom: 1.7rem;
  padding: 1rem;
  background-color: #80cbc4;
  border-radius: 1rem;
`
export default function Cart() {
  const [accessCheckOut] = React.useState(true)
  const context = useContext(ProductsContext)
  const localStorageCart = JSON.parse(window.localStorage.getItem("cart-items"))
  useEffect(() => context.setCartItems(localStorageCart || []), [])
  const cartProps = { type: "اضافه کن", func: removeProduct, num: "عدد" }
  const favoriteProps = { type: "برو تو سبد", func: removeFavorite, num: "" }
  const nextListProps = { type: "برو تو سبد", func: removeNextList, num: "" }
  const navigate = useNavigate()
  let numNextList = context.nextList.length
  const allPrice = context.cartItems.reduce((a, c) => a + c.price * c.count, 0)
  let numFavoriteItems = context.favorite.length

  return (
    <>
      <Header />
      <Grid display="flex">
        <Grid flex={1} sx={{ bgcolor: "lightblue" }}>
          سبد
        </Grid>
        <Grid flex={0.4} sx={{ bgcolor: "lightgray" }}>
          سبد بعدی
        </Grid>
      </Grid>
    </>
  )
}
