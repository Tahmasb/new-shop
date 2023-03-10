import {
  Button,
  Grid,
  TextField,
  Typography,
  Modal,
  Autocomplete,
  Snackbar,
  Alert,
} from "@mui/material"
import { IoMdClose } from "react-icons/io"
import { useFormik } from "formik"
import { supabase } from "../../CreateClient"
import * as Yup from "yup"
import * as React from "react"
import { useSelector } from "react-redux"

export default function AdminProducts(props) {
  const [snackError, setSnackError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState("")
  const URL =
    /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i

  const itemValue = useSelector((state) => state.products.categories)
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
        const { error } = await supabase.from("products").insert(values)
        if (error === null) {
          props.setOpenModal(false)
          props.setSnack(true)
          props.fetchProducts()
          console.log(error)
          resetForm()
        } else {
          snackError(true)
          setErrorMessage(error.message)
        }
      }
      // alert(JSON.stringify(values))
      addProduct()
    },
    validationSchema: Yup.object({
      img: Yup.string().matches(URL, "???????? ?????????? ????????").required("??????????"),
      title: Yup.string().min(3, "?????????? ???? ??????????????").required("??????????"),
      categoryName: Yup.string().required("??????????"),
      exist: Yup.number().min(1, "?????????? ???? ?????? ????????").required("??????????"),
      price: Yup.number("???????? ?????? ????????")
        .min(1, "?????????? ???? ?????? ????????")
        .required("??????????"),
    }),
  })

  React.useEffect(() => {
    let test = itemValue.filter(
      (item) => item.categoryName === formik.values.categoryName
    )[0] || { categoryId: "" }
    formik.setFieldValue("categoryId", test.categoryId)
  }, [formik.values.categoryName])

  const option = []
  itemValue.map((item) => option.push(item.categoryName))
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
          position="relative"
          sx={{ bgcolor: "var(--lightGray)", borderRadius: "5px", mx: "auto" }}
        >
          <IoMdClose
            onClick={() => props.setOpenModal(false)}
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              cursor: "pointer",
            }}
          />
          <Typography textAlign="center">???????????? ????????</Typography>
          <Grid>
            <TextField
              autoFocus
              label={"???????? ?????? ????????"}
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
              label={"?????? ????????"}
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
            {/* {console.log(newArrayOfObj)} */}
            <Autocomplete
              disablePortal
              name="categoryName"
              options={option}
              onChange={(value, value2) => {
                formik.setFieldValue("categoryName", value2)
              }}
              // freeSolo={true}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  label="???????? ????????"
                  fullWidth
                  type="text"
                />
              )}
            />

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
                label="????????????"
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
                label="????????"
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
            ??????????
          </Button>
        </Grid>
      </Modal>
      <Snackbar
        open={snackError}
        autoHideDuration={4000}
        onClose={() => setSnackError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
    </>
  )
}
