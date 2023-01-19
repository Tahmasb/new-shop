import { Grid, Tooltip } from "@mui/material"
import { Product, Skeleton, ScrollToTop } from ".."
import ProductsContext from "../../context/ProductContext"
import React, { useContext, useEffect, useState } from "react"
import { MdArrowLeft } from "react-icons/md"
import { Link } from "react-router-dom"
import styles from "./Categorys.module.css"
import { supabase } from "../../CreateClient"

export default function Categorys() {
  const context = useContext(ProductsContext)
  const [skeleton, setSkeleton] = useState(true)
  const [categorys, setCategorys] = useState([])
  let checkLocal =
    localStorage.hasOwnProperty("all-products") &&
    localStorage.hasOwnProperty("all-categorys") // or false

  async function fetchUsers() {
    if (checkLocal) {
      let products = JSON.parse(window.localStorage.getItem("all-products"))
      let categorys = JSON.parse(window.localStorage.getItem("all-categorys"))
      context.setProducts(products)
      setCategorys(categorys || [])

      window.localStorage.setItem(
        "all-products",
        JSON.stringify(products || [])
      )
      window.localStorage.setItem(
        "all-categorys",
        JSON.stringify(categorys || [])
      )
      setSkeleton(false)
    } else {
      let { data } = await supabase.from("products").select("*")
      let { data: categorys } = await supabase.from("categorys").select("*")
      context.setProducts(data)
      setCategorys(categorys || [])
      window.localStorage.setItem("all-products", JSON.stringify(data || []))
      window.localStorage.setItem(
        "all-categorys",
        JSON.stringify(categorys || [])
      )
      setSkeleton(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])
  return (
    <>
      {skeleton ? (
        <Skeleton />
      ) : (
        <>
          {categorys.map((category, index) => (
            <React.Fragment key={index}>
              <Grid className={styles.parentCategoryTitle}>
                <Tooltip title={`برو تو دسته بندی ${category.categoryName}`}>
                  <Link
                    to={`category/${category.categoryId}`}
                    className={styles.categoryTitle}
                  >
                    {category.categoryName}
                    <MdArrowLeft fontSize={"2rem"} />
                  </Link>
                </Tooltip>
              </Grid>
              <Grid container>
                <Product
                  // key={index}
                  categoryName={category.categoryName}
                  numShow={5}
                />
              </Grid>
              <ScrollToTop />
            </React.Fragment>
          ))}
        </>
      )}
    </>
  )
}
