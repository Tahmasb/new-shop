import {
  Button,
  ButtonGroup,
  CardMedia,
  Fade,
  Grid,
  Typography,
} from "@mui/material"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { ProductsContext } from "./../"
// import dish from "./../../assets/img/dish.jpg"
import { formatCurrency, addProduct } from "./../../utils"

export default function CartTemplate(props) {
  let context = useContext(ProductsContext)
  return (
    <Fade in={true}>
      <Grid
        display="flex"
        p={0.5}
        justifyContent={"space-between"}
        sx={{
          flexDirection: { xs: "column", s: "row" },
          borderBottom: "0.1px solid lightgray",
        }}
        style={{ background: "#fafafa" }}
      >
        <Link
          to={`/product/${props.cartItem.categoryId}${props.cartItem.uniqueId}`}
        >
          <CardMedia
            sx={{ maxWidth: "11.5rem", margin: "auto" }}
            component="img"
            src={props.cartItem.img}
            alt="product"
          />
        </Link>
        <Grid
          width="100%"
          display="flex"
          flexDirection={"column"}
          rowGap={3}
          p={1}
          justifyContent="space-around"
        >
          <Grid display="flex" justifyContent={"space-between"}>
            <Link
              to={`/product/${props.cartItem.categoryId}${props.cartItem.uniqueId}`}
            >
              <Typography fontFamily={"vazir"}>
                {props.cartItem.title}
              </Typography>{" "}
            </Link>
            <Typography>{formatCurrency(props.cartItem.price)}</Typography>
          </Grid>
          <Grid
            display="flex"
            alignItems="center"
            justifyContent={"space-between"}
          >
            <Typography>{`${props.cartItem.count || ""} ${
              props.info.num
            }`}</Typography>
            <ButtonGroup orientation="vertical">
              <Button
                onClick={() => {
                  addProduct(context, props.cartItem)
                }}
                size="small"
                color="primary"
                variant="outlined"
              >
                {props.info.type}
              </Button>
              <Button
                onClick={() => {
                  props.info.func(context, props.cartItem.uniqueId)
                }}
                size="small"
                color="error"
              >
                حذف از اینجا
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
    </Fade>
  )
}
