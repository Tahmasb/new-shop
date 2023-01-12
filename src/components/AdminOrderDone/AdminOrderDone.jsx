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
} from "@mui/material"
import React from "react"
import { formatCurrency } from "../../utils"

export default function AdminOrderDone(props) {
  return (
    <Modal
      open={props.openModal}
      onClose={() => props.closeModal((prev) => !prev)}
    >
      <Grid
        sx={{
          width: { xs: "95%", sm: "90%", md: "70%", lg: "60%" },
          bgcolor: "#e0f2f1",
          margin: "auto",
          mt: "5rem",
        }}
      >
        <Typography variant="h6" textAlign={"center"} py={3}>
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
            <span style={{ color: "var(--darkBlue)" }}>
              {" "}
              {`${props.customOrder.customerInfo.name} ${props.customOrder.customerInfo.family}`}
            </span>
          </Typography>
          <Typography>
            آدرس:{" "}
            <span style={{ color: "var(--darkBlue)" }}>
              {props.customOrder.customerInfo.address}
            </span>
          </Typography>
          <Typography>
            تلفن:{" "}
            <span style={{ color: "var(--darkBlue)" }}>
              {props.customOrder.customerInfo.phone}
            </span>{" "}
          </Typography>

          <Grid>
            <Typography display={"inline-block"}> زمان سفارش:</Typography>
            <span
              style={{ color: "var(--darkBlue)" }}
            >{` ${props.customOrder.customerInfo.date}`}</span>
          </Grid>
          <Grid>
            <Typography display={"inline-block"}> زمان تحویل:</Typography>
            <span
              style={{ color: "var(--darkBlue)" }}
            >{` ${props.customOrder.customerInfo.date}`}</span>
          </Grid>
        </Grid>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>کالا</TableCell>
                <TableCell>قیمت</TableCell>
                <TableCell>تعداد</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.customOrder.cartItems.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.title}
                  </TableCell>
                  <TableCell>{formatCurrency(item.price)}</TableCell>
                  <TableCell>{item.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Modal>
  )
}
