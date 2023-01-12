import { Button, Grid, Typography } from "@mui/material"
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <Grid
      display="flex"
      flexDirection={"column"}
      alignItems="center"
      justifyContent="center"
      mt={"25vh"}
      rowGap={5}
    >
      <Typography mx={1}>
        همچین آدرسی نداریم انصافا، اگه میخای بری صفحه اصلی این پایین کلیک کن
      </Typography>
      <Button variant="contained">
        <Link to="/">صفحه اصلی</Link>
      </Button>
    </Grid>
  )
}
