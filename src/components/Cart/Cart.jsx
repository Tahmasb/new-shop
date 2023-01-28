import { CardMedia, Grid, Typography, Box } from "@mui/material"
import Tab from "@mui/material/Tab"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
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

const TypographyCus = styled(Typography)`
  padding: 1rem;
`
const GridCus2 = styled(Grid)`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1.2rem;
`
export default function Cart() {
  const [tabNum, setTabNum] = React.useState("1")
  const handleChange = (event, newValue) => {
    setTabNum(newValue)
  }
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
      <TabContext value={tabNum}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              label={`سبدخرید   ${context.cartItems.length || ""}`}
              value="1"
            />
            <Tab label={`خرید بعدی  ${numNextList || ""}`} value="2" />
            <Tab label={`علاقه‌مندی‌ها  ${numFavoriteItems || ""}`} value="3" />
          </TabList>
        </Box>
        <TabPanel sx={{ p: "0px" }} value="1">
          <GridCus2
            position={"relative"}
            sx={{ width: { xs: "100%", md: "70%", lg: "60%" } }}
          >
            {(context.cartItems.length || 0) > 0 ? (
              <>
                <Grid mb={12}>
                  {context.cartItems.map((item, index) => (
                    <CartTemplate
                      info={cartProps}
                      key={index}
                      cartItem={item}
                    />
                  ))}
                </Grid>
                <Grid
                  sx={{
                    position: { xs: "fixed", md: "absolute" },
                    bottom: { xs: "0px", md: "0px" },
                  }}
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
              </>
            ) : (
              <CardMedia
                component="img"
                src="https://s2.uupload.ir/files/empty-cart_4v3w.png"
                style={{ objectFit: "contain", height: "80vh" }}
                alt="empty-cart"
              />
            )}
          </GridCus2>
        </TabPanel>
        <TabPanel sx={{ p: "0px" }} value="2">
          {" "}
          {numNextList ? (
            <GridCus2 sx={{ width: { xs: "100%", md: "70%", lg: "60%" } }}>
              {context.nextList.map((item, index) => (
                <CartTemplate
                  info={nextListProps}
                  key={index}
                  cartItem={item}
                />
              ))}
            </GridCus2>
          ) : (
            <GridCus2 style={{ marginTop: "5px" }}>
              <TypographyCus>سبد خرید بعدیت خالیه</TypographyCus>
              <TypographyCus variant="caption">
                میتونی چیزایی که بعدا میخای بخری از صفحه محصول به اینجا اضافه
                کنی
              </TypographyCus>
            </GridCus2>
          )}
        </TabPanel>
        <TabPanel sx={{ p: "0px" }} value="3">
          {numFavoriteItems ? (
            <GridCus2 sx={{ width: { xs: "100%", md: "70%", lg: "60%" } }}>
              {context.favorite.map((item, index) => (
                <CartTemplate
                  info={favoriteProps}
                  key={index}
                  cartItem={item}
                />
              ))}
            </GridCus2>
          ) : (
            <GridCus2 style={{ marginTop: "5px" }}>
              <TypographyCus>لیست مورد علاقت خالیه</TypographyCus>
              <TypographyCus variant="caption">
                میتونی چیزایی که دوست داری رو از صفحه محصول به اینجا اضافه کنی
              </TypographyCus>
            </GridCus2>
          )}
        </TabPanel>
      </TabContext>
    </>
  )
}
