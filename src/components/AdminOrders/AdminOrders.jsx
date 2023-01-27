import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  LinearProgress,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material"
import { BiSortAlt2 } from "react-icons/bi"
import styles from "./adminOrders.module.css"
import { formatCurrency } from "../../utils"
import { supabase } from "../../CreateClient"
import { AdminOrderDone } from "./../"
import React from "react"

export default function AdminOrders() {
  const [currentCheck, setCurretCheck] = React.useState(false)
  const [detail, setDetail] = React.useState(false)
  const [sort, setSort] = React.useState(false)
  const [showProgress, setShowProgress] = React.useState(true)
  const [orders, setOrders] = React.useState([])

  async function fetchOrders() {
    let { data } = await supabase.from("orders").select("*")
    setOrders(data || [])
    setShowProgress(false)
  }
  React.useEffect(() => {
    fetchOrders()
  }, [])
  if (orders.length < 1 && showProgress === false) {
    return (
      <div className="error-conection">لطفا اتصال اینترنت را بررسی کنید</div>
    )
  }

  let sortArray = [...orders].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )
  let resultArr
  sort ? (resultArr = sortArray) : (resultArr = orders)
  currentCheck
    ? (resultArr = resultArr.filter((order) => order.delivered === true))
    : (resultArr = resultArr.filter((order) => order.delivered === false))

  return (
    <>
      {showProgress ? (
        <LinearProgress />
      ) : (
        <Grid>
          <Grid
            mb={1}
            sx={{ display: { xs: "inline", sm: "flex" } }}
            justifyContent={"space-between"}
            columnGap={1}
          >
            <Typography
              sx={{ display: { xs: "none", sm: "block" } }}
              m={1}
              variant={"h6"}
            >
              مدیریت سفارشات
            </Typography>
            <Grid m={1}>
              <FormControlLabel
                label={
                  <Typography variant="body2">
                    سفارش‌های در انتظار ارسال
                  </Typography>
                }
                control={
                  <Checkbox
                    size="small"
                    checked={!currentCheck}
                    onChange={() => {
                      setCurretCheck(!currentCheck)
                    }}
                  />
                }
              />
              <FormControlLabel
                label={
                  <Typography variant="body2">سفارش‌های تحول‌شده</Typography>
                }
                control={
                  <Checkbox
                    size="small"
                    checked={currentCheck}
                    onChange={() => {
                      setCurretCheck(!currentCheck)
                    }}
                  />
                }
              />
            </Grid>
          </Grid>
          <TableContainer sx={{ width: { sm: "100%", lg: "80%" }, m: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "0%" }}> کاربر</TableCell>
                  <TableCell align="right">مبلغ</TableCell>
                  <TableCell
                    style={{ cursor: "pointer" }}
                    onClick={() => setSort(!sort)}
                    align="right"
                  >
                    <Grid
                      justifyContent="end"
                      columnGap={0.3}
                      display="inline-flex"
                      p={0.2}
                      alignItems={"center"}
                    >
                      <Typography variant="body2">تاریخ</Typography>
                      <BiSortAlt2 />
                    </Grid>
                  </TableCell>
                  <TableCell align="center">بررسی</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {resultArr.map((order, index) => (
                  <React.Fragment key={index}>
                    <TableRow>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        component="th"
                        scope="row"
                      >
                        {`${order.customerInfo.name} ${order.customerInfo.family}`}
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(order.customerInfo.allPrice)}
                      </TableCell>
                      <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                        {order.date}
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="body2"
                          onClick={() => {
                            setDetail(order)
                          }}
                          className={styles.checkOrder}
                        >
                          بررسی سفارش
                        </Typography>
                      </TableCell>
                    </TableRow>
                    {detail ? (
                      <AdminOrderDone
                        customOrder={detail}
                        openModal={Boolean(detail)}
                        closeModal={setDetail}
                      />
                    ) : null}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
    </>
  )
}
