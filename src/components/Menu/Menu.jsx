import React from "react"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material"
import { FcExpand } from "react-icons/fc"
import "./menu.css"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
export default function Menu(props) {
  const allCategorys = useSelector((state) => state.products.categories)
  const allProducts = useSelector((state) => state.products.products)
  const [expanded, setExpanded] = React.useState(allCategorys[0].categoryId)
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }
  return (
    <Grid>
      {allCategorys.map((category, index) => (
        <Accordion
          onChange={handleChange(category.categoryId)}
          expanded={expanded === category.categoryId}
          key={index}
        >
          <AccordionSummary expandIcon={<FcExpand />}>
            <Link
              className={"category-name"}
              to={`/category/${category.categoryId}`}
            >
              {category.categoryName}
            </Link>
          </AccordionSummary>
          <AccordionDetails>
            {allProducts.map((product, indexx) =>
              product.categoryId === category.categoryId ? (
                <Link
                  key={indexx}
                  className={"category-item"}
                  // style={{ color: theme.palette.primary.dark }}
                  to={`/product/${product.categoryId}${product.uniqueId}`}
                >
                  <Typography>{product.title}</Typography>
                </Link>
              ) : null
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Grid>
  )
}
