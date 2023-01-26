import { Grid, Typography, Link } from "@mui/material"
import { FaTelegramPlane, FaTwitter } from "react-icons/fa"
import { BsInstagram, BsYoutube } from "react-icons/bs"
import { styled } from "@mui/system"
import styles from "./footer.module.css"
export default function Footer() {
  const GridCus = styled(Grid)`
    flex: 1;
    row-gap: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `
  return (
    <Grid bgcolor={"var(--lightGray)"} py={2}>
      <Grid mt={4} mx={2} display="flex" justifyContent={"space-around"}>
        <GridCus>
          <Typography color="darkcyan">سایت‌های ما</Typography>
          <Link className={styles.linkFooter}>سایت اول</Link>
          <Link className={styles.linkFooter}>سایت دوم</Link>
          <Link className={styles.linkFooter}>سایت سوم</Link>
          <Link className={styles.linkFooter}>سایت چهارم</Link>
        </GridCus>

        <GridCus>
          <Typography color="darkcyan">همراه با ما</Typography>
          <Link className={styles.linkFooter}>فرصت شغلی</Link>
          <Link className={styles.linkFooter}>تماس با ما</Link>
          <Link className={styles.linkFooter}>درباره ما</Link>
          <Link className={styles.linkFooter}>اتاق خبر</Link>
        </GridCus>

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
          columnGap: { xs: ".3rem", s: "2rem" },
        }}
        justifyContent="center"
        mt={5}
      >
        <Link
          className={styles.parentIcon}
          href="https://www.instagram.com/hassan_tahmasbtabar"
          target="_blank"
        >
          <BsInstagram
            className={styles.footerIcon}
            style={{ color: "#f70037" }}
          />
        </Link>
        <Link
          className={styles.parentIcon}
          href="https://t.me/+989387018726"
          target={"_blank"}
        >
          <FaTelegramPlane
            className={styles.footerIcon}
            style={{ color: "#0099ff" }}
          />
        </Link>
        <Link className={styles.parentIcon}>
          <FaTwitter
            className={styles.footerIcon}
            style={{ color: "#2596be" }}
          />
        </Link>

        <Link className={styles.parentIcon}>
          <BsYoutube
            className={styles.footerIcon}
            style={{ color: "#f20000" }}
          />
        </Link>
      </Grid>
    </Grid>
  )
}
