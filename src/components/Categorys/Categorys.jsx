import { getProducts, getCategories } from "../../store/thunks/productsThunks"
import { Grid, Tooltip } from "@mui/material"
import { Product, Skeleton, ScrollToTop } from ".."
import React from "react"
import { MdArrowLeft } from "react-icons/md"
import { Link } from "react-router-dom"
import styles from "./Categorys.module.css"
import { useDispatch, useSelector } from "react-redux"

export default function Categorys() {
  let loading = useSelector((state) => state.products.loading)
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(getCategories())
    dispatch(getProducts())
  }, [])
  let allCategorys = useSelector((state) => state.products.categories)

  // if (categorys.length < 1 && skeleton === false) {
  //   return (
  //     <div className="error-conection">لطفا اتصال اینترنت را بررسی کنید</div>
  //   )
  // }
  return (
    <>
      {loading ? (
        <Skeleton />
      ) : (
        allCategorys.map((category, index) => (
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
