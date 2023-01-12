import { createTheme } from "@mui/material/styles"
import rtlplugin from "stylis-plugin-rtl"
import createCache from "@emotion/cache"
import { prefixer } from "stylis"

const cacheRTL = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlplugin],
})

const theme = createTheme({
  direction: "rtl",
  breakpoints: {
    values: { xs: 0, s: 370, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "IRANSansWebFaNum",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          cursor: "pointer",
        },
      },
    },
  },
})
export { theme, cacheRTL }
