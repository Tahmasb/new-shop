import {
  Button,
  Snackbar,
  Tooltip,
  ButtonGroup,
  CardMedia,
  Grid,
  Typography,
  Alert,
  Link,
} from "@mui/material"
import { Helmet } from "react-helmet-async"
import useCounter from "./../../customHooks/useCounter"
import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { ProductsContext } from "./../index"
import { MdOutlineFavoriteBorder } from "react-icons/md"
import { BsShare } from "react-icons/bs"
import { IoMdNotificationsOutline } from "react-icons/io"
import { BiMessageSquareAdd } from "react-icons/bi"
import styles from "./productDetails.module.css"
import {
  formatCurrency,
  addProduct,
  removeProduct,
  addFavorite,
  addNextList,
} from "./../../utils"
// import dish from "./../../assets/img/dish.jpg"
import { ScrollToTop } from "./../"

export default function ProductDetails() {
  let allProducts = JSON.parse(window.localStorage.getItem("all-products"))
  let localStorageCart =
    JSON.parse(window.localStorage.getItem("cart-items")) || []
  const params = useParams()
  const context = useContext(ProductsContext)
  // find select product from context
  let selectProduct
  allProducts.map((product) => {
    ;`${product.categoryId}${product.uniqueId}` === params.productID
      ? (selectProduct = product)
      : null
  })
  let numCart = localStorageCart.length

  let inCart = localStorageCart.filter(
    (item) => item.uniqueId === selectProduct.uniqueId
  )
  let result = numCart && inCart.length > 0 ? inCart[0].count : 0
  let [count, addCount, minusCount] = useCounter(result)
  // snack state
  let [openSnackShare, setOpenSnackShare] = useState(false)
  let [openSnackFavorite, setOpenSnackFavorite] = useState(false)
  let [openSnackAddList, setOpenSnackAddList] = useState(false)
  let [openSnackNotif, setOpenSnackNotif] = useState(false)
  let hrefPage = window.location.href

  return (
    <>
      <Helmet>
        <title>{` فروشگاه لورم  (${selectProduct.title}) `} </title>
      </Helmet>
      <ScrollToTop />
      <Grid
        display="flex"
        sx={{
          flexDirection: { xs: "column", md: "row" },
          mr: { xs: 1, md: 3.5 },
        }}
      >
        <Grid flex={1}>
          <CardMedia
            style={{ objectFit: "contain" }}
            height={400}
            component="img"
            src={selectProduct.img} //{dish}
            alt="product image"
          />
        </Grid>
        <Grid
          className={styles.iconParent}
          flex={0.1}
          p={1}
          ml={1.1}
          sx={{
            flexDirection: { xs: "row", md: "column" },
            justifyContent: { xs: "start", md: "center" },
            order: { xs: 0, md: -1 },
          }}
        >
          <Tooltip placement="top" title="ارسال برای دوستان">
            <Link
              onClick={() => {
                setOpenSnackShare(true)
                navigator.clipboard.writeText(hrefPage)
              }}
            >
              <BsShare />
              <Snackbar
                autoHideDuration={3000}
                message="لینک این کالا کپی شد :)"
                open={openSnackShare}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                onClose={() => {
                  setOpenSnackShare(false)
                }}
              />
            </Link>
          </Tooltip>

          <Tooltip placement="top" title="افزودن به علاقه مندی‌ها">
            <Link
              onClick={() => {
                setOpenSnackFavorite(true)
                addFavorite(context, selectProduct)
              }}
            >
              <MdOutlineFavoriteBorder />
              <Snackbar
                autoHideDuration={3000}
                open={openSnackFavorite}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                onClose={() => {
                  setOpenSnackFavorite(false)
                }}
              >
                <Alert severity="success">به علاقه مندی‌هات اضافه شد</Alert>
              </Snackbar>
            </Link>
          </Tooltip>
          <Tooltip placement="top" title="قیمت تغییر کرد بهت خبر میدیم">
            <Link
              onClick={() => {
                setOpenSnackNotif(true)
              }}
            >
              <IoMdNotificationsOutline />
              <Snackbar
                autoHideDuration={3000}
                message="قیمت تغییر کرد برات ایمیل میزنیم حتما :)"
                open={openSnackNotif}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                onClose={() => {
                  setOpenSnackNotif(false)
                }}
              />
            </Link>
          </Tooltip>
          <Tooltip placement="top" title="اضافه کردن به لیست خرید بعدی">
            <Link
              onClick={() => {
                setOpenSnackAddList(true)
                addNextList(context, selectProduct)
              }}
            >
              <BiMessageSquareAdd />
              <Snackbar
                autoHideDuration={3000}
                message="به لیست خرید بعدیت اضافه شد"
                open={openSnackAddList}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                onClose={() => {
                  setOpenSnackAddList(false)
                }}
              >
                <Alert severity="success">به لیست خرید بعدی اضافه شد</Alert>
              </Snackbar>
            </Link>
          </Tooltip>
        </Grid>
        <Grid
          flex={1}
          mx={1.4}
          display="flex"
          flexDirection={"column"}
          rowGap={6}
          justifyContent="center"
        >
          <Grid mt={1.9} mx={0.9} display="flex" justifyContent="space-between">
            <Typography style={{ fontFamily: "vazir" }}>
              {selectProduct.title}{" "}
            </Typography>
            <Typography>{formatCurrency(selectProduct.price)}</Typography>
          </Grid>
          <Typography textAlign={"justify"}>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنای زیادی در شصت و
            سه درصد گذشته حال و آینده، شناخت قرار گیرد.
          </Typography>
          <Grid>
            <ButtonGroup sx={{ display: count ? "block" : "none" }}>
              <Button
                onClick={() => {
                  addCount()
                  addProduct(context, selectProduct)
                }}
                variant="contained"
              >
                +
              </Button>
              <Button>{count}</Button>
              <Button
                onClick={() => {
                  minusCount()
                  removeProduct(context, selectProduct.uniqueId)
                }}
                variant="contained"
              >
                -
              </Button>
            </ButtonGroup>
            <Button
              variant="contained"
              onClick={() => {
                addCount()
                addProduct(context, selectProduct, 5)
              }}
              sx={{ display: count ? "none" : "block" }}
            >
              افزودن به سبد
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {/* description for product (bottom box) */}
      <Grid
        my={3}
        display="flex"
        mx={1.3}
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
        justifyContent={"space-around"}
      >
        <Grid mt={3} display="flex" flexDirection={"column"} rowGap={1}>
          <Typography color="#0099ff">مشخصات محصول</Typography>
          <Typography mt={1}>قدرت : بی نظیر</Typography>
          <Typography>زیبایی : مدرن</Typography>
          <Typography>ضدآب : در برابراسپری</Typography>
          <Typography>ضخامت : ۱۰۰میلی متر</Typography>
          <Typography>گرافیک : ۱۰۰۰۰</Typography>
        </Grid>
        <Grid
          mt={3}
          style={{ marginTop: { xs: 3, sm: 0 } }}
          display="flex"
          flexDirection={"column"}
          rowGap={1}
        >
          <Typography color="#0099ff">مشخصات محصول</Typography>
          <Typography mt={1}>قدرت : بی نظیر</Typography>
          <Typography>زیبایی : مدرن</Typography>
          <Typography>ضدآب : در برابر اسپری</Typography>
          <Typography>ضخامت : ۱۰۰میلی متر</Typography>
          <Typography>گرافیک : ۱۰۰۰۰</Typography>
        </Grid>
      </Grid>
    </>
  )
}
