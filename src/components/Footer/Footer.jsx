import { Grid, Typography, Link as LinkM } from "@mui/material"
import { FaTelegramPlane, FaTwitter } from "react-icons/fa"
import { BsInstagram, BsYoutube } from "react-icons/bs"
import { Link } from "react-router-dom"
import "./footer.css"

export default function Footer() {
  return (
    <Grid py={2} sx={{ bgcolor: "var(--lightGray)" }}>
      <Grid mt={4} mx={2} display="flex" justifyContent={"space-around"}>
        <Grid
          flex={0.7}
          rowGap={2.1}
          display="flex"
          alignItems="center"
          flexDirection={"column"}
        >
          <Typography>سایت‌های ما</Typography>
          <Link className="link-footer">سایت اول</Link>
          <Link className="link-footer">سایت دوم</Link>
          <Link className="link-footer">سایت سوم</Link>
          <Link className="link-footer">سایت چهارم</Link>
        </Grid>

        <Grid
          display="flex"
          flex={0.7}
          flexDirection="column"
          rowGap={2.1}
          alignItems="center"
        >
          <Typography>همراه با ما</Typography>
          <Link className="link-footer">فرصت شغلی</Link>
          <Link className="link-footer">تماس با ما</Link>
          <Link className="link-footer">درباره ما</Link>
          <Link className="link-footer">اتاق خبر</Link>
        </Grid>

        <Grid
          flex={1.3}
          flexDirection="column"
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <Typography textAlign="left">درباره ما</Typography>
          <Typography mt={2} textAlign="justify">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، کاربردهای متنوع با هدف بهبود ابزارهای
            کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و سوالات
            پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
          </Typography>
        </Grid>
      </Grid>

      <Grid
        p={2}
        display="flex"
        sx={{
          bgcolor: "var(--lightGray)",
          columnGap: { xs: ".3rem", s: "2rem" },
        }}
        justifyContent="center"
        mt={5}
      >
        <LinkM
          className="parent-icon"
          href="https://t.me/+989387018726"
          target={"_blank"}
        >
          <FaTelegramPlane
            className="footer-icon"
            style={{ color: "#45a5e7" }}
          />
        </LinkM>
        <LinkM className="parent-icon">
          <FaTwitter className="footer-icon" style={{ color: "#1da1f2" }} />
        </LinkM>
        <LinkM
          className="parent-icon"
          href="https://www.instagram.com/hassan_tahmasbtabar"
          target="_blank"
        >
          <BsInstagram className="footer-icon" style={{ color: "#f70037" }} />
        </LinkM>
        <LinkM className="parent-icon">
          <BsYoutube className="footer-icon" style={{ color: "#f20000" }} />
        </LinkM>
      </Grid>
    </Grid>
  )
}
