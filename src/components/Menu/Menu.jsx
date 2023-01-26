import React from "react"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material"
import { FcExpand } from "react-icons/fc"
import styles from "./menu.module.css"
import { Link } from "react-router-dom"
import { BsGridFill } from "react-icons/bs"
export default function Menu(props) {
  const allCategorys = JSON.parse(window.localStorage.getItem("all-categorys"))
  const allProducts = JSON.parse(window.localStorage.getItem("all-products"))
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
              className={styles.categoryName}
              to={`/category/${category.categoryId}`}
            >
              {category.categoryName}
            </Link>
          </AccordionSummary>
          <AccordionDetails>
            <ul>
              {allProducts.map((product, indexx) =>
                product.categoryId === category.categoryId ? (
                  <li key={indexx}>
                    <Link
                      className={styles.categoryItem}
                      to={`/product/${product.categoryId}${product.uniqueId}`}
                    >
                      {product.title}
                    </Link>
                  </li>
                ) : null
              )}
            </ul>
          </AccordionDetails>
        </Accordion>
      ))}
    </Grid>
  )
}

// <li key={index}>
//   <ul>
//     <Typography onClick={(prev) => props.close(!prev)}>
//       <Link
//         className={styles.categoryName}
//         to={`/category/${category.categoryId}`}
//       >
//         <BsGridFill />
//         {category.categoryName}
//       </Link>
//     </Typography>
//     {allProducts.map((product, indexx) =>
//       product.categoryId === category.categoryId ? (
//         <li className={styles.categoryItem} key={indexx}>
//           <Link
//             style={{
//               display: "block",
//               padding: "0.7rem",
//               paddingLeft: "6rem",
//               paddingRight: "1rem",
//               fontFamily: "vazir",
//             }}
//             to={`/product/${product.categoryId}${product.uniqueId}`}
//           >
//             {product.title}
//           </Link>
//         </li>
//       ) : null
//     )}
//   </ul>
// </li>
