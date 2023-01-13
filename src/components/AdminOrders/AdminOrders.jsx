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
} from "@mui/material"
import styles from "./adminOrders.module.css"
import { formatCurrency } from "../../utils"
import { supabase } from "../../CreateClient"
import { AdminOrderDone } from "./../"
import React, { useEffect, useState } from "react"

export default function AdminOrders() {
  const [showProgress, setShowProgress] = useState(true)
  const [orders, setOrders] = useState([])
  const [detail, setDetail] = React.useState(false)

  async function fetchUsers() {
    let { data } = await supabase.from("orders").select("*")
    setOrders(data || [])
    setShowProgress(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <>
      {showProgress ? (
        <LinearProgress />
      ) : (
        <Grid>
          <TableContainer sx={{ width: { sm: "100%", lg: "80%" }, m: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "0%" }}> کاربر</TableCell>
                  <TableCell align="right">مبلغ</TableCell>
                  <TableCell align="right">تاریخ</TableCell>
                  <TableCell align="center">بررسی</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders
                  .sort(function (a, b) {
                    return a + b
                  })
                  .map((order, index) => (
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
                          {order.customerInfo.date}
                        </TableCell>
                        <TableCell align="center">
                          <Typography
                            variant="body2"
                            onClick={() => {
                              setDetail(order)
                            }}
                            sx={{
                              display: "inline",
                              bgcolor: "var(--lightGray)",
                              borderRadius: "0.5rem",
                              whiteSpace: "nowrap",
                              cursor: "pointer",
                              p: "5px",
                            }}
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
