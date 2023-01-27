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
import { useTheme } from "@mui/material/styles"
import { Link } from "react-router-dom"
export default function Menu(props) {
  const allCategorys = JSON.parse(window.localStorage.getItem("all-categorys"))
  const allProducts = JSON.parse(window.localStorage.getItem("all-products"))
  const [expanded, setExpanded] = React.useState(allCategorys[0].categoryId)
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }
  const theme = useTheme()
  console.log(theme.palette.primary.main)
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
