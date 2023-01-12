import {
  Grid,
  Button,
  Link,
  Typography,
  InputAdornment,
  TextField,
} from "@mui/material"
import { BsTwitter, BsGithub, BsGoogle } from "react-icons/bs"
import { useFormik } from "formik"
import * as Yup from "yup"
import {
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdAlternateEmail,
} from "react-icons/md"
import { useState } from "react"
export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values))
    },
    validationSchema: Yup.object({
      email: Yup.string().email("ایمیل معتبر نیست").required("ضروری"),
      password: Yup.string().min(8, "حداقل هشت کاراکتر").required("ضروری"),
    }),
  })
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
        >
          <Typography variant="h6">ورود</Typography>
          <Grid mt={3} display="flex" flexDirection={"column"}>
            <TextField
              {...formik.getFieldProps("email")}
              label="ایمیل"
              autoFocus
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
              label="رمز عبور"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
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
    </>
  )
}
