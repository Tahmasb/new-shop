import { CardMedia, Grid, Typography } from "@mui/material"
import { useContext, useEffect } from "react"
import { ProductsContext, CartTemplate } from ".."
import styles from "./cart.module.css"
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
  margin-top: 1.5rem;
  margin-bottom: 1.7rem;
  padding: 1rem;
  background-color: white;
  text-align: center;
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
      <Grid
        display="flex"
        pb={0}
        sx={{
          flexDirection: { xs: "column", md: "row" },
          bgcolor: "#f5f5f5",
        }}
      >
        {(context.cartItems.length || 0) > 0 ? (
          <GridCus
            minHeight={"74vh"}
            pb={3}
            px={1}
            borderBottom={1}
            borderColor="lightgray"
          >
            <TypographyCus>
              تعداد محصولات سبد خرید: {context.cartItems.length}
            </TypographyCus>
            {context.cartItems.map((item, index) => (
              <CartTemplate info={cartProps} key={index} cartItem={item} />
            ))}
            <Grid
              sx={{ position: { xs: "fixed", md: "static" }, bottom: "0px" }}
              className={styles.endPriceParent}
            >
              <Typography
                onClick={() => {
                  navigate("/checkout", {
                    state: { allprice: allPrice, access: accessCheckOut },
                  })
                }}
                className={styles.endPriceChild}
              >
                نهایی کردن خرید : {formatCurrency(allPrice)} تومان
              </Typography>
            </Grid>
          </GridCus>
        ) : (
          <GridCus>
            <CardMedia
              component="img"
              src="https://s2.uupload.ir/files/empty-cart_4v3w.png"
              style={{ objectFit: "contain", height: "80vh" }}
              alt="empty-cart"
            />
          </GridCus>
        )}
        <GridCus px={1}>
          {numFavoriteItems ? (
            <GridCus>
              <TypographyCus>
                چیزایی که دوس داری: {numFavoriteItems}
              </TypographyCus>
              {context.favorite.map((item, index) => (
                <CartTemplate
                  info={favoriteProps}
                  key={index}
                  cartItem={item}
                />
              ))}
            </GridCus>
          ) : (
            <Grid
              display="flex"
              mt={1}
              alignItems="center"
              rowGap={10}
              flexDirection={"column"}
            >
              <TypographyCus width={180}>لیست مورد علاقت خالیه</TypographyCus>
              <TypographyCus sx={{ bgcolor: "#f5f5f5" }} variant="caption">
                میتونی محصولاتی که دوست داری رو از صفحه اون محصول به اینجا اضافه
                کنی
              </TypographyCus>
            </Grid>
          )}
          {numNextList ? (
            <GridCus pb={5}>
              <TypographyCus>سبد خرید بعدی شما: {numNextList}</TypographyCus>
              {context.nextList.map((item, index) => (
                <CartTemplate
                  info={nextListProps}
                  key={index}
                  cartItem={item}
                />
              ))}
            </GridCus>
          ) : (
            <Grid
              display="flex"
              alignItems="center"
              rowGap={10}
              mt={10}
              flexDirection={"column"}
            >
              <TypographyCus width={180}>سبد خرید بعدیت خالیه</TypographyCus>
              <TypographyCus sx={{ bgcolor: "#f5f5f5" }} variant="caption">
                میتونی محصولاتی که بعدا میخای بخری از صفحه اون محصول به اینجا
                اضافه کنی
              </TypographyCus>
            </Grid>
          )}
        </GridCus>
      </Grid>
    </>
  )
}
