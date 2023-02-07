import { Grid } from "@mui/material"
import React from "react"
import { IoIosArrowUp } from "react-icons/io"
export default function ScrollToTop() {
  const myStyleClassName = {
    "& :hover": {
      backgroundColor: "white",
      borderRadius: "50%",
    },
  }

  const [sitePosition, setSitePosition] = React.useState(false)
  function handleScroll() {
    // console.log("scroll hassan")
    document.documentElement.scrollTop > 200
      ? setSitePosition(true)
      : setSitePosition(false)
  }
  React.useEffect(() => {
    document.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  })
  return (
    <>
      <Grid
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: "3",
          fontSize: "2.5rem",
          backgroundColor: "#A2D9FF",
          borderRadius: "50%",
          paddind: "1rem",
        }}
        sx={myStyleClassName}
      >
        <IoIosArrowUp
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={
            sitePosition
              ? {
                  display: "block",
                  cursor: "pointer",
                  color: "#0099FF",
                }
              : { display: "none" }
          }
        />
      </Grid>
    </>
  )
}
