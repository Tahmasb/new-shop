import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material"

import { BsStar } from "react-icons/bs"
import { motion } from "framer-motion"
// import dish from "./../../assets/img/dish.jpg"
import { Link } from "react-router-dom"
import { formatCurrency } from "./../../utils"
import "./product.css"
import React from "react"
export default function Product(props) {
  let [state, setState] = React.useState(false)
  let rows = []
  JSON.parse(window.localStorage.getItem("all-products")).map((product) => {
    if (product.categoryName === props.categoryName) rows.push(product)
    else if (product.title === props.productTitle) rows.push(product)
    else null
  })

  React.useEffect(() => {
    setState(!state)
  }, [])
  return (
    <>
      {rows.map((product, index) =>
        index < props.numShow ? (
          <Grid
            className="product-item"
            key={index}
            item
            component={motion.div}
            animate={{ scale: 1 }}
            initial={{ scale: 0.7 }}
            whileHover={{
              scale: 1.05,
            }}
            // exit={{ scale: 0, opacity: 0 }}
            // transition={{ duration: 5 }}
            p={0.4}
            lg={props.lg}
            md={props.md}
            sm={4}
            xs={6}
            display="flex"
          >
            <Card>
              <Link to={`/product/${product.categoryId}${product.uniqueId}`}>
                <Grid p={1.2}>
                  <CardMedia
                    src={product.img}
                    component="img"
                    sx={{ objectFit: "contain" }}
                    width={"800px"}
                    // height="100%"
                    alt="product image"
                  />
                </Grid>
              </Link>
              <CardContent
                sx={{
                  paddingX: { xs: "7px", sm: "16px" },
                }}
              >
                <Grid
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <Grid display="flex" justifyContent={"space-between"}>
                    <Link
                      to={`/product/${product.categoryId}${product.uniqueId}`}
                    >
                      <Typography sx={{ fontFamily: "vazir" }} variant="body2">
                        {product.title}
                      </Typography>
                    </Link>
                    <Typography variant="body2">
                      {`${formatCurrency(product.price)} `}
                    </Typography>
                  </Grid>
                  <Grid mt={2} display="flex" justifyContent="space-between">
                    <Typography variant="caption">
                      موجودی {product.exist}
                    </Typography>
                    <Grid display="flex" columnGap={0.6}>
                      <Typography variant="body2">
                        {Math.floor(Math.random() * 5 + 1)}
                      </Typography>
                      <BsStar />
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ) : null
      )}
    </>
  )
}
Product.defaultProps = {
  lg: 2.4,
  md: 3,
  productTitle: "&%$",
}
