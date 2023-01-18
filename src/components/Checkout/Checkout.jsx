import {
  Button,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material"
import React from "react"
import { Header, ProductsContext } from "./.."
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { DateObject } from "react-multi-date-picker"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useNavigate, useLocation, Navigate } from "react-router-dom"
import { useContext } from "react"
import { supabase } from "../../CreateClient"
export default function Checkout(props) {
  const pageSize = useMediaQuery("(min-width:600px)")
  const location = useLocation()
  const navigate = useNavigate()
  const context = useContext(ProductsContext)

  const formik = useFormik({
    initialValues: {
      name: "",
      family: "",
      address: "",
      phone: "",
      date: "",
      allPrice: location.state ? location.state.allprice : 0,
    },

    onSubmit: (values) => {
      async function addOrder() {
        await supabase
          .from("orders")
          .insert({ customerInfo: values, cartItems: context.cartItems })
      }
      addOrder()
      navigate("/")
      context.setCartItems([])
      window.localStorage.setItem("cart-items", JSON.stringify([]))
    },
    validationSchema: Yup.object({
      name: Yup.string().required("ضروری").min(2, "حداقل دو کاراکتر"),
      family: Yup.string().min(3, "حداقل سه کاراکتر").required("ضروری"),
      address: Yup.string().min(25, "حداقل ۲۵ کاراکتر").required("ضروری"),
      phone: Yup.string()
        .required("ضروری")
        .min(11, "شماره معتبر نیست")
        .max(11, "شماره معتبر نیست"),
      date: Yup.string().required("ضروری"),
    }),
  })

  return (
    <>
      {location.state ? (
        <>
          {" "}
          <Header />
          <Grid
            container
            sx={{ p: { lg: 6, sm: 1 } }}
            display="flex"
            rowGap={3}
          >
            <Grid m="auto" item xs={12} sm={8} md={6} p={3}>
              <Typography mb={1.5}>نام</Typography>
              <TextField
                {...formik.getFieldProps("name")}
                autoFocus
                fullWidth
              />
              {formik.touched.name && formik.errors.name ? (
                <Typography color="red" variant="caption">
                  {formik.errors.name}
                </Typography>
              ) : null}
            </Grid>
            <Grid m="auto" item xs={12} sm={8} md={6} p={3}>
              <Typography mb={1.5}>نام خوانوادگی</Typography>
              <TextField {...formik.getFieldProps("family")} fullWidth />
              {formik.touched.family && formik.errors.family ? (
                <Typography color="red" variant="caption">
                  {formik.errors.family}
                </Typography>
              ) : null}
            </Grid>
            <Grid m="auto" item xs={12} sm={8} md={6} p={3}>
              <Typography mb={1.5}>آدرس</Typography>
              <TextField
                {...formik.getFieldProps("address")}
                multiline
                minRows={3}
                fullWidth
              />
              {formik.touched.address && formik.errors.address ? (
                <Typography color="red" variant="caption">
                  {formik.errors.address}
                </Typography>
              ) : null}
            </Grid>
            <Grid m="auto" item xs={12} sm={8} md={6} p={3}>
              <Typography mb={1.5}>تلفن همراه</Typography>

              <TextField
                sx={{ direction: "rtl" }}
                {...formik.getFieldProps("phone")}
                type={"tel"}
                fullWidth
              />
              {formik.touched.phone && formik.errors.phone ? (
                <Typography color="red" variant="caption">
                  {formik.errors.phone}
                </Typography>
              ) : null}
            </Grid>
            <Grid
              sx={{ widht: "100%", margin: { xs: "auto", md: "0" } }}
              item
              xs={12}
              sm={8}
              md={6}
              p={3}
            >
              <Typography mb={1.5}>تاریخ تحویل</Typography>
              <Grid>
                <DatePicker
                  editable={false}
                  placeholder="انتخاب تاریخ تحویل"
                  name="date"
                  containerStyle={{ width: "100%" }}
                  style={{
                    width: "100%",
                    height: "49px",
                    fontSize: "1.1rem",
                    textAlign: "center",
                  }}
                  onChange={(newValue) => {
                    formik.setFieldValue("date", newValue.format("YYYY/MM/DD"))
                  }}
                  value={formik.values.date}
                  onKeyPress={(e) => e.preventDefault()}
                  calendar={persian}
                  locale={persian_fa}
                  minDate={new DateObject({ calender: persian }).add(
                    -1,
                    "days"
                  )}
                  maxDate={new DateObject({ calender: persian }).add(
                    10,
                    "days"
                  )}
                />
              </Grid>
              {formik.touched.date && formik.errors.date ? (
                <Typography color="red" variant="caption">
                  {formik.errors.date}
                </Typography>
              ) : null}
            </Grid>
          </Grid>
          <Grid my={5} display="flex" justifyContent="center">
            <Button
              onClick={() => {
                formik.handleSubmit()
              }}
              variant="contained"
              size="large"
              fullWidth
              color="success"
              sx={{ maxWidth: "16rem" }}
            >
              پرداخت
            </Button>
          </Grid>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  )
}
Checkout.defaultProps = {
  access: false,
}
