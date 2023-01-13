import React from "react"
import { Grid, Typography } from "@mui/material"
import styles from "./menu.module.css"
import { Link } from "react-router-dom"
import { BsGridFill } from "react-icons/bs"
export default function Menu(props) {
  const allCategorys = JSON.parse(window.localStorage.getItem("all-categorys"))
  const allProducts = JSON.parse(window.localStorage.getItem("all-products"))
  return (
    <>
      <Grid>
        <ul>
          {allCategorys.map((category, index) => (
            <li key={index}>
              <ul>
                <Typography onClick={(prev) => props.close(!prev)}>
                  <Link
                    className={styles.categoryName}
                    to={`/category/${category.categoryId}`}
                  >
                    <BsGridFill />
                    {category.categoryName}
                  </Link>
                </Typography>
                {allProducts.map((product, indexx) =>
                  product.categoryId === category.categoryId ? (
                    <li className={styles.categoryItem} key={indexx}>
                      <Link
                        style={{
                          display: "block",
                          padding: "0.9rem",
                          paddingLeft: "6rem",
                          paddingRight: "1rem",
                          fontFamily: "vazir",
                        }}
                        to={`/product/${product.categoryId}${product.uniqueId}`}
                      >
                        {product.title}
                      </Link>
                    </li>
                  ) : null
                )}
              </ul>
            </li>
          ))}
        </ul>
      </Grid>
    </>
  )
}
