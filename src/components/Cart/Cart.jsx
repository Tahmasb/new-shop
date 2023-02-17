import {
  deleteNextList,
  addNextList,
  deleteFavorite,
  deleteCart,
} from "./../../store/features/productsSlice"
import { useSelector, useDispatch } from "react-redux"
import { CardMedia, Grid, Typography, Box } from "@mui/material"
import Tab from "@mui/material/Tab"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import { CartTemplate } from ".."
import styles from "./cart.module.css"
import { styled } from "@mui/system"
import React from "react"
import { formatCurrency } from "./../../utils"
import { useNavigate } from "react-router-dom"
import { BsArrowLeft } from "react-icons/bs"

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
  let favoriteItems = useSelector((state) => state.products.favorites)
  let nextListItems = useSelector((state) => state.products.nextList)
  let cartItems = useSelector((state) => state.products.cartItems)
  const dispatch = useDispatch()
  const [tabNum, setTabNum] = React.useState("1")
  const handleChange = (event, newValue) => {
    setTabNum(newValue)
  }
  const [accessCheckOut] = React.useState(true)
  const cartProps = { type: "اضافه کن", func: deleteCart, num: "عدد" }
  const favoriteProps = { type: "برو تو سبد", func: deleteFavorite, num: "" }
  const nextListProps = { type: "برو تو سبد", func: deleteNextList, num: "" }
  const navigate = useNavigate()
  const allPrice = cartItems.reduce((a, c) => a + c.price * c.count, 0)
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
            <Tab label={`سبدخرید   ${cartItems.length || ""}`} value="1" />
            <Tab label={`خرید بعدی  ${nextListItems.length || ""}`} value="2" />
            <Tab
              label={`علاقه‌مندی‌ها  ${favoriteItems.length || ""}`}
              value="3"
            />
          </TabList>
        </Box>
        <TabPanel sx={{ p: "0px" }} value="1">
          <GridCus2
            position={"relative"}
            sx={{ width: { xs: "100%", md: "70%", lg: "60%" } }}
          >
            {(cartItems.length || 0) > 0 ? (
              <>
                <Grid mb={12}>
                  {cartItems.map((item, index) => (
                    <CartTemplate
                      info={cartProps}
                      key={index}
                      cartItem={item}
                    />
                  ))}
                </Grid>
                <Grid
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
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
                    نهایی کردن خرید
                    <BsArrowLeft style={{ marginRight: "6px" }} />
                  </Typography>
                  <Typography className={styles.price}>
                    {formatCurrency(allPrice)} تومان
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
          {nextListItems.length ? (
            <GridCus2 sx={{ width: { xs: "100%", md: "70%", lg: "60%" } }}>
              {nextListItems.map((item, index) => (
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
          {favoriteItems.length ? (
            <GridCus2 sx={{ width: { xs: "100%", md: "70%", lg: "60%" } }}>
              {favoriteItems.map((item, index) => (
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
