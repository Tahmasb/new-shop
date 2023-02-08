import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Modal,
  Button,
} from "@mui/material"
import { styled } from "@mui/system"
// import styles from "./adminOrderDone.module.css"
import { supabase } from "../../CreateClient"
import { IoMdClose } from "react-icons/io"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import React from "react"
import { formatCurrency } from "../../utils"
import { DateObject } from "react-multi-date-picker"
export default function AdminOrderDone(props) {
  async function updateOrder(orderId) {
    const { data, error } = await supabase
      .from("orders")
      .update({ delivered: true })
      .eq("id", orderId)
  }
  const TableCellCus = styled(TableCell)`
    color: #f4f2ef;
  `

  return (
    <Modal
      open={props.openModal}
      sx={{ overflowY: "auto" }}
      onClose={() => props.closeModal((prev) => !prev)}
    >
      <Grid
        sx={{
          width: { xs: "95%", sm: "90%", md: "70%", lg: "60%" },
          bgcolor: "#18144d",
          color: "#efc01a",
          margin: "auto",
          mt: "2rem",
        }}
        position="relative"
      >
        <IoMdClose
          onClick={() => props.closeModal(false)}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            color: "#efc01a",
            cursor: "pointer",
          }}
        />
        <Typography color="#efc01a" variant="h6" textAlign={"center"} py={3}>
          جزئیات سفارش
        </Typography>
        <Grid
          p={2}
          display="flex"
          flexDirection="column"
          rowGap={2}
          justifyContent="center"
        >
          <Typography>
            نام مشتری:
            <span>
              {`${props.customOrder.customerInfo.name} ${props.customOrder.customerInfo.family}`}
            </span>
          </Typography>
          <Typography>
            آدرس: <span>{props.customOrder.customerInfo.address}</span>
          </Typography>
          <Typography>
            تلفن: <span>{props.customOrder.customerInfo.phone}</span>{" "}
          </Typography>

          <Grid>
            <Typography display={"inline-block"}> زمان سفارش:</Typography>
            <span>{` ${new DateObject(props.customOrder.date)
              .convert(persian, persian_fa)
              .format("YYYY/MM/DD")}`}</span>
          </Grid>
          <Grid>
            <Typography display={"inline-block"}> زمان تحویل:</Typography>
            <span>{` ${props.customOrder.customerInfo.date}`}</span>
          </Grid>
        </Grid>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCellCus>کالا</TableCellCus>
                <TableCellCus>قیمت</TableCellCus>
                <TableCellCus>تعداد</TableCellCus>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.customOrder.cartItems.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCellCus
                    style={{ fontFamily: "vazir" }}
                    component="th"
                    scope="row"
                  >
                    {item.title}
                  </TableCellCus>
                  <TableCellCus>{formatCurrency(item.price)}</TableCellCus>
                  <TableCellCus>{item.count}</TableCellCus>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {!props.customOrder.delivered ? (
          <Grid display="flex" justifyContent="center" py={2}>
            <Button
              onClick={() => {
                updateOrder(props.customOrder.id)
                props.closeModal(false)
              }}
              variant="contained"
              color="success"
              sx={{ color: "#efc01a" }}
            >
              تحویل شد
            </Button>
          </Grid>
        ) : null}
      </Grid>
    </Modal>
  )
}
