import {
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Modal,
} from "@mui/material"
import styles from "./panelProductAdd.module.css"
import { useFormik } from "formik"
import { supabase } from "../../CreateClient"
import * as Yup from "yup"
import * as React from "react"

export default function AdminProducts(props) {
  const itemValue = JSON.parse(window.localStorage.getItem("all-categorys"))
  const formik = useFormik({
    initialValues: {
      img: "",
      title: "",
      categoryName: "",
      categoryId: "",
      exist: "",
      price: "",
    },
    onSubmit: (values, { resetForm }) => {
      async function addProduct() {
        await supabase.from("products").insert(values)
        props.setOpenModal(false)
        props.setSnack(true)
        props.fetchProducts()
        resetForm()
      }
      // alert(JSON.stringify(values))
      addProduct()
    },
    validationSchema: Yup.object({
      img: Yup.string().min(3, "لینک اشتباهه").required("ضروری"),
      title: Yup.string().min(3, "حداقل سه کاراکتر").required("ضروری"),
      categoryName: Yup.string().required("ضروری"),
      exist: Yup.number().min(1, "بیشتر از صفر باشه").required("ضروری"),
      price: Yup.number("لطفا عدد وارد")
        .min(1, "بیشتر از صفر باشه")
        .required("ضروری"),
    }),
  })

  React.useEffect(() => {
    let test = itemValue.filter(
      (item) => item.categoryName === formik.values.categoryName
    )[0] || { categoryId: "" }
    formik.setFieldValue("categoryId", test.categoryId)
  }, [formik.values.categoryName])

  return (
    <>
      <Modal open={props.openModal} onClose={() => props.setOpenModal(false)}>
        <Grid
          mt={"3vh"}
          p={2}
          maxWidth={"400px"}
          display="flex"
          flexDirection={"column"}
          gap={2.8}
          sx={{ bgcolor: "var(--lightGray)", borderRadius: "5px", mx: "auto" }}
        >
          <Typography textAlign="center">افزودن کالا</Typography>
          <Grid>
            <TextField
              autoFocus
              label={"لینک عکس کالا"}
              {...formik.getFieldProps("img")}
              fullWidth
              size="small"
            />
            {formik.touched.img && formik.errors.img ? (
              <Typography color={"red"} variant="caption">
                {formik.errors.img}
              </Typography>
            ) : null}
          </Grid>
          <Grid>
            <TextField
              {...formik.getFieldProps("title")}
              type="text"
              size="small"
              label={"اسم کالا"}
              variant="outlined"
              fullWidth
            />
            {formik.touched.title && formik.errors.title ? (
              <Typography color={"red"} variant="caption">
                {formik.errors.title}
              </Typography>
            ) : null}
          </Grid>
          <Grid>
            <TextField
              {...formik.getFieldProps("categoryName")}
              size="small"
              select
              label={"دسته بندی"}
              defaultValue={""}
              type="text"
              variant="outlined"
              fullWidth
            >
              {itemValue.map((item) => (
                <MenuItem key={item.categoryId} value={item.categoryName}>
                  {item.categoryName}
                </MenuItem>
              ))}
            </TextField>
            {formik.touched.categoryName && formik.errors.categoryName ? (
              <Typography color={"red"} variant="caption">
                {formik.errors.categoryName}
              </Typography>
            ) : null}
          </Grid>

          <Grid>
            <Grid>
              <TextField
                {...formik.getFieldProps("exist")}
                type={"number"}
                fullWidth
                sx={{ mt: 3 }}
                label="موجودی"
                size="small"
              />
              {formik.touched.exist && formik.errors.exist ? (
                <Typography color={"red"} variant="caption">
                  {formik.errors.exist}
                </Typography>
              ) : null}
            </Grid>
            <>
              <TextField
                // {...formik.getFieldProps("price")}
                name="price"
                onChange={(e) => {
                  let newValue = e.target.value.split(",").join("")
                  if (isNaN(Number(newValue))) return
                  formik.setFieldValue("price", newValue)
                }}
                onBlur={formik.handleBlur}
                value={Number(formik.values.price).toLocaleString()}
                sx={{ mt: 3 }}
                type="text"
                fullWidth
                label="قیمت"
                size="small"
              />{" "}
              {formik.touched.price && formik.errors.price ? (
                <Typography color={"red"} variant="caption">
                  {formik.errors.price}
                </Typography>
              ) : null}
            </>
          </Grid>
          <Button
            onClick={() => {
              formik.handleSubmit()
            }}
            variant="contained"
          >
            ذخیره
          </Button>
        </Grid>
      </Modal>
    </>
  )
}
