import {
  Grid,
  Button,
  Link,
  Typography,
  InputAdornment,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material"
import { setCookie } from "../../utils"
import { IoMdClose } from "react-icons/io"
import { supabase } from "./../../CreateClient"
import { BsTwitter, BsGithub, BsGoogle } from "react-icons/bs"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"
import {
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdAlternateEmail,
} from "react-icons/md"
import { useState } from "react"
export default function Login(props) {
  const [disabledButtom, setDisabledButtom] = useState(false)
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const formik = useFormik({
    initialValues: {
      email: "hggvff222@gmail.com",
      password: "aliALI22",
    },
    onSubmit: (values) => {
      login()
      // alert(JSON.stringify(values))
    },
    validationSchema: Yup.object({
      email: Yup.string().email("ایمیل معتبر نیست").required("ضروری"),
      password: Yup.string().min(8, "حداقل هشت کاراکتر").required("ضروری"),
    }),
  })
  let password = formik.values.password
  let email = formik.values.email
  const [snackLoginShow, setSnackLoginShow] = useState(false)

  const login = async () => {
    setDisabledButtom(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    setDisabledButtom(false)
    if (error) {
      setSnackLoginShow(true)
    } else {
      setCookie("user-email", data.user.email, 2)
      navigate("/admin/products")
    }
  }

  return (
    <>
      <Grid margin={"auto"} mb={6} marginTop={"10vh"} maxWidth={350}>
        <Grid
          borderRadius={2}
          maxWidth={500}
          sx={{ bgcolor: "whitesmoke", padding: 5 }}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          gap={3.5}
          position="relative"
        >
          <IoMdClose
            onClick={() => props.closeModal(false)}
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              cursor: "pointer",
            }}
          />

          <Typography variant="h6">ورود</Typography>
          <Grid mt={3} display="flex" flexDirection={"column"}>
            <TextField
              {...formik.getFieldProps("email")}
              label="ایمیل hggvff222@gmail.com"
              // error={Boolean(formik.errors.email)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <MdAlternateEmail />
                  </InputAdornment>
                ),
              }}
            />

            {formik.touched.email && formik.errors.email ? (
              <Typography color="red" variant="caption">
                {formik.errors.email}
              </Typography>
            ) : null}
          </Grid>
          <Grid mt={3} display="flex" flexDirection={"column"}>
            <TextField
              {...formik.getFieldProps("password")}
              label=" رمز aliALI22 "
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <MdOutlineVisibilityOff />
                    ) : (
                      <MdOutlineVisibility />
                    )}
                  </InputAdornment>
                ),
              }}
            />
            {formik.touched.password && formik.errors.password ? (
              <Typography color="red" variant="caption">
                {formik.errors.password}
              </Typography>
            ) : null}
            <Link>
              <Typography variant="caption">فراموشی رمز عبور</Typography>
            </Link>
          </Grid>
          <Button
            onClick={() => {
              formik.handleSubmit()
            }}
            variant="contained"
            size="large"
            disabled={!formik.isValid || disabledButtom}
          >
            ورود
          </Button>
          <Grid>
            <Typography variant="body2">یا ثبت نام کنید با</Typography>

            <Grid display="flex" justifyContent="center" gap={0.8} mt={1}>
              <Link>
                <BsGoogle style={{ color: "#dd2c00" }} />
              </Link>
              <Link>
                <BsGithub style={{ color: "black" }} />
              </Link>
              <Link>
                <BsTwitter style={{ color: "#2962ff" }} />
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        open={snackLoginShow}
        autoHideDuration={4000}
        onClose={() => setSnackLoginShow(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error">ایمیل یا رمز ورود صحیح نیست</Alert>
      </Snackbar>
    </>
  )
}
