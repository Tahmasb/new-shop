import * as React from "react"
import { DataGrid } from "@mui/x-data-grid"
import { supabase } from "../../CreateClient"
import { PanelProductAdd } from "./../"
import "./adminProducts.css"
import { AiOutlineDelete } from "react-icons/ai"
import { Grid, Snackbar, Modal, Typography, Button, Alert } from "@mui/material"
import { formatCurrency } from "../../utils"

export default function adminProducts() {
  // states
  const [deleteItem, setDeleteItem] = React.useState("")
  const [snackDeleteProduct, setSnackDeleteProduct] = React.useState(false)
  const [snackShow, setSnackShow] = React.useState(false)
  const [modalAddProduct, setModalAddProduct] = React.useState(false)
  const [deleteId, setDeleteId] = React.useState(null)
  const [rows, setRows] = React.useState([])
  const [openModalDelete, setOpenModalDelete] = React.useState(false)
  const [editSnack, setEditSnack] = React.useState(false)
  // functions
  const handleClose = () => setOpenModalDelete(false)

  async function deleteProduct(productId) {
    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("uniqueId", productId)

    if (data) console.log(data)
    if (error) console.log(error)

    handleClose()
    fetchProducts()
    setSnackDeleteProduct(true)
  }

  async function updateProduct(editedProduct) {
    const { data, error } = await supabase
      .from("products")
      .update(editedProduct)
      .eq("uniqueId", editedProduct.uniqueId)
    if (error) console.log(error)
    if (data) console.log(data)
    fetchProducts()
    setEditSnack(true)
  }

  async function fetchProducts() {
    let { data } = await supabase.from("products").select("*")
    window.localStorage.setItem("all-products", JSON.stringify(data))
    setRows(data)
  }

  React.useEffect(() => {
    fetchProducts()
    window.scrollTo(0, 0)
  }, [])
  // data-grid column
  const columns = [
    {
      field: "delete",
      headerName: "حذف",
      sortable: false,
      headerAlign: "center",
      renderCell: () => (
        <Grid className="column-delete-product">
          <AiOutlineDelete onClick={() => setOpenModalDelete(true)} />
        </Grid>
      ),
      flex: 0.5,
    },
    {
      field: "price",
      headerName: "قیمت",
      flex: 0.8,
      type: "number",
      editable: true,
      headerAlign: "center",
      cellClassName: "class-price",
      valueFormatter: ({ value }) => `${formatCurrency(value)}`,
    },
    {
      field: "exist",
      headerName: "موجودی",
      flex: 0.6,
      headerAlign: "center",
      editable: true,
    },
    {
      field: "categoryName",
      headerName: "دسته بندی",
      flex: 0.9,
      headerAlign: "right",
      cellClassName: "select-cells",
    },
    {
      field: "title",
      headerName: "نام",
      editable: true,
      flex: 0.8,
      headerAlign: "right",
      cellClassName: "select-cells",
      renderCell: ({ value }) => (
        <p style={{ fontFamily: "vazir" }} dir="rtl">
          {value}
        </p>
      ),
    },
  ]
  // custom message when get data from api
  function CustomMessage() {
    return (
      <Grid textAlign={"center"} mt={"20%"}>
        <Typography>در حال دریافت محصولات از سرور</Typography>
      </Grid>
    )
  }
  return (
    <>
      {/* modal add product and delete product */}

      <PanelProductAdd
        openModal={modalAddProduct}
        setOpenModal={setModalAddProduct}
        setSnack={setSnackShow}
        fetchProducts={fetchProducts}
      />

      <Modal sx={{ m: "auto" }} open={openModalDelete} onClose={handleClose}>
        <Grid
          p={2}
          display="flex"
          flexDirection="column"
          m="auto"
          rowGap={5}
          mt={"32vh"}
          sx={{ bgcolor: "white", width: "300px" }}
        >
          <Typography textAlign={"center"}>
            مطمئنی میخای{" "}
            <span style={{ color: "red", fontSize: "1rem" }}>{deleteItem}</span>{" "}
            حذفش کنی؟
          </Typography>
          <Grid display="flex" justifyContent={"center"} columnGap={8}>
            <Button
              variant="outlined"
              onClick={() => deleteProduct(deleteId)}
              color="error"
            >
              آره
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              نه
            </Button>
          </Grid>
        </Grid>
      </Modal>

      {/* header component */}

      <Grid
        sx={{ mx: { xs: "3%", md: "10%", lg: "15%" } }}
        display="flex"
        justifyContent={"space-between"}
        alignItems="center"
        mt={"10px"}
      >
        <Typography>مدیریت کالاها</Typography>
        <Button
          onClick={() => setModalAddProduct(true)}
          variant="contained"
          color="success"
        >
          افزودن کالا
        </Button>
      </Grid>

      <div
        style={{
          width: "100%",
          marginTop: "5px",
          overflowX: "auto",
        }}
      >
        {/* data-grid */}
        <Grid
          height="100vh"
          py={3}
          margin="auto"
          sx={{
            width: { xs: "114%", sm: "100%", md: "80%", lg: "70%" },
          }}
        >
          <DataGrid
            style={{ direction: "ltr" }}
            rows={rows}
            columns={columns}
            getRowId={(row) => row.uniqueId}
            processRowUpdate={React.useCallback(async (newRow) => {
              updateProduct(newRow)
              return newRow
            })}
            onProcessRowUpdateError={React.useCallback((error) => {
              console.log(error.message)
            })}
            experimentalFeatures={{ newEditingApi: true }}
            editMode="row"
            onCellClick={(params) => {
              setDeleteId(params.id)
              setDeleteItem(params.row.title)
            }}
            components={{
              NoRowsOverlay: CustomMessage,
            }}
          />
        </Grid>
      </div>

      {/* snackbars */}
      <Snackbar
        open={snackShow}
        autoHideDuration={4000}
        onClose={() => setSnackShow(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success">کالا به لیست محصولات اضافه شد</Alert>
      </Snackbar>
      <Snackbar
        open={snackDeleteProduct}
        autoHideDuration={4000}
        onClose={() => setSnackDeleteProduct(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success">کالا از لیست محصولات حذف شد</Alert>
      </Snackbar>
      <Snackbar
        open={editSnack}
        autoHideDuration={4000}
        onClose={() => setEditSnack(false)}
        message="محصول ویرایش شد"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success">محصول ویرایش شد</Alert>
      </Snackbar>
    </>
  )
}
