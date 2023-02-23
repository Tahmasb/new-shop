import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Navigation, Pagination, Autoplay } from "swiper"
import slide1 from "./../../assets/img/books.jpg"
import slide2 from "./../../assets/img/kitchen.jpg"
import slide3 from "./../../assets/img/phone.jpg"
import slide4 from "./../../assets/img/sport.jpg"
import { CardMedia, Grid } from "@mui/material"
import { Link } from "react-router-dom"
let slides = [
  { categroy: "stationery", img: slide1 },
  { categroy: "kitchen", img: slide2 },
  { categroy: "mobile", img: slide3 },
  { categroy: "disport", img: slide4 },
]
export default function Swipers() {
  return (
    <Swiper
      dir="rtl"
      navigation={false}
      loop={true}
      autoplay={{
        delay: 6000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Navigation, Pagination]}
      className="mySwiper"
    >
      {slides.map((slide, index) => {
        return (
          <SwiperSlide key={index}>
            <Grid
              sx={{
                height: {
                  sm: "206px",
                  md: "305px",
                  lg: "380px",
                },
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
              <Link to={`category/${slide.categroy}`}>
                <CardMedia
                  component={"img"}
                  width="100%"
                  height={"100%"}
                  style={{
                    objectFit: "cover",
                  }}
                  src={slide.img}
                  alt="slide"
                />
              </Link>
            </Grid>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
