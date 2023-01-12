import { Drawer, Grid, Typography, useMediaQuery } from "@mui/material"
import { useParams } from "react-router-dom"
import { Product, Header, Menu, ScrollToTop, Footer } from "./../index"
import { Helmet } from "react-helmet-async"
import styles from "./../Categorys/Categorys.module.css"
import { AiOutlineMenu } from "react-icons/ai"
import { useState } from "react"

export default function CustomCategory() {
  const params = useParams()
  let selectCategory
  JSON.parse(window.localStorage.getItem("all-categorys")).map((category) => {
    category.categoryId === params.categoryID
      ? (selectCategory = category)
      : null
  })
  let pageSize = useMediaQuery("(min-width:900px)")

  const [drawerState, setDrawerState] = useState(false)
  const hamberger = {
    display: { xs: "flex", md: "none" },
    mr: "1.6rem",
    fontSize: "1.5rem",
    cursor: "pointer",
    padding: ".2rem",
  }
  return (
    <>
      <Helmet>
        <title>{`${selectCategory.categoryName}`}</title>
      </Helmet>
      <ScrollToTop />
      <Header />
      {pageSize ? null : (
        <Drawer
          sx={{ width: "50%" }}
          anchor="left"
          open={drawerState}
          onClose={() => {
            setDrawerState(false)
          }}
        >
          <Menu close={setDrawerState} />
        </Drawer>
      )}
      <Grid container display="flex">
        <Grid
          item
          lg={2.2}
          md={3}
          sx={{
            display: { xs: "none", md: "block" },
            bgcolor: "var(--lightGray)",
          }}
        >
          <Menu close={setDrawerState} />
        </Grid>
        <Grid item lg={9.8} md={9}>
          <Grid
            display="flex"
            alignItems="center"
            justifyContent={"space-between"}
            className={styles.parentCategoryTitle}
          >
            <Typography variant="h6" className={styles.categoryTitle}>
              {selectCategory.categoryName}
            </Typography>
            <Grid onClick={() => setDrawerState(true)} sx={hamberger}>
              <AiOutlineMenu />
            </Grid>
          </Grid>
          <Grid container>
            <Product
              lg={3}
              md={4}
              categoryName={selectCategory.categoryName}
              numShow={100}
            />
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </>
  )
}
