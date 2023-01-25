import { Grid, Tooltip } from "@mui/material"
import { Product, Skeleton, ScrollToTop } from ".."
import React from "react"
import { MdArrowLeft } from "react-icons/md"
import { Link } from "react-router-dom"
import styles from "./Categorys.module.css"
import { supabase } from "../../CreateClient"
export default function Categorys() {
  React.useEffect(() => {
    fetchUsers()
  }, [])
  const [skeleton, setSkeleton] = React.useState(true)
  const [categorys, setCategorys] = React.useState([])

  async function fetchUsers() {
    let { data: products } = await supabase.from("products").select("*")
    let { data: categorys } = await supabase.from("categorys").select("*")
    setCategorys(categorys || [])
    window.localStorage.setItem("all-products", JSON.stringify(products || []))
    window.localStorage.setItem(
      "all-categorys",
      JSON.stringify(categorys || [])
    )
    setSkeleton(false)
  }
  if (categorys.length < 1 && skeleton === false) {
    return (
      <div className="error-conection">لطفا اتصال اینترنت را بررسی کنید</div>
    )
  }
  return (
    <>
      {skeleton ? (
        <Skeleton />
      ) : (
        categorys.map((category, index) => (
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
        ))
      )}
    </>
  )
}
