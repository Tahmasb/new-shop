import { Grid, Tooltip } from "@mui/material"
import { Product, Skeleton, ScrollToTop } from ".."
import React from "react"
import { MdArrowLeft } from "react-icons/md"
import { Link } from "react-router-dom"
import styles from "./Categorys.module.css"
import { supabase } from "../../CreateClient"
import { useQuery } from "react-query"

export default function Categorys() {
  async function fetchCategorys() {
    let { data } = await supabase.from("categorys").select("*")
    return data
  }
  async function fetchProducts() {
    let { data } = await supabase.from("products").select("*")
    return data
  }
  const { data: categorys, status } = useQuery(["categorys"], fetchCategorys)
  const { data: products, status: status2 } = useQuery(
    ["products"],
    fetchProducts
  )

  if (status === "loading" || status2 === "loading") return <Skeleton />
  if (categorys === null || products === null)
    return (
      <div className="error-conection">لطفا اتصال اینترنت را بررسی کنید</div>
    )
  window.localStorage.setItem("all-categorys", JSON.stringify(categorys))
  window.localStorage.setItem("all-categorys", JSON.stringify(products))

  return (
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
  )
}
