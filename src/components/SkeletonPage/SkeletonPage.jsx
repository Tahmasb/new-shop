import React from "react"
import { Skeleton, Grid } from "@mui/material"

export default function SkeletonPage() {
  let loop = [1, 2, 3, 4, 5]
  return (
    <Grid
      container
      mb={1}
      display="flex"
      flexWrap="wrap"
      justifyContent={"center"}
    >
      <Skeleton
        sx={{ my: "1.5rem" }}
        variant="rectangular"
        width="100%"
        height="4rem"
      />
      <Grid display="flex" flexWrap={"wrap"} container>
        {loop.map((current, index) => (
          <Grid item key={index} p={0.5} md={3} sm={4} xs={6} lg={2.4}>
            <Skeleton variant="rectangular" height="250px" />
            <Skeleton variant="text" sx={{ fontSize: "1.7rem" }} />
            <Skeleton variant="text" width="80%" sx={{ fontSize: "1.5rem" }} />
          </Grid>
        ))}
      </Grid>
      <Skeleton
        sx={{ my: "1.5rem" }}
        variant="rectangular"
        width="100%"
        height="4rem"
      />
      <Grid display="flex" flexWrap={"wrap"} container>
        {loop.map((current, index) => (
          <Grid item key={index} p={0.5} md={3} sm={4} xs={6} lg={2.4}>
            <Skeleton variant="rectangular" height="250px" />
            <Skeleton variant="text" sx={{ fontSize: "1.7rem" }} />
            <Skeleton variant="text" width="80%" sx={{ fontSize: "1.5rem" }} />
          </Grid>
        ))}
      </Grid>
    </Grid> 
  )
}
