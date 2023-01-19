const isLogin = (userName) => {
  if (userName === "mojtaba") return true
  else return false
}
const formatCurrency = (num) => {
  return Number(Number(num).toFixed(3)).toLocaleString()
}

const removeProduct = (cartContext, uniqueID) => {
  let copyCartContext = [...cartContext.cartItems]
  copyCartContext.map((cartItem) => {
    if (cartItem.uniqueId === uniqueID) {
      if (cartItem.count > 1) {
        cartItem.count -= 1
        cartContext.setCartItems(copyCartContext)
        window.localStorage.setItem(
          "cart-items",
          JSON.stringify(copyCartContext)
        )
      } else {
        let newCart = copyCartContext.filter((v) => v.uniqueId !== uniqueID)
        cartContext.setCartItems(newCart)
        window.localStorage.setItem("cart-items", JSON.stringify(newCart))
      }
    }
    return null
  })
}

const addProduct = (context, addItem, max = 10) => {
  let isInCartItems = context.cartItems.some(
    (bagProduct) => bagProduct.uniqueId === addItem.uniqueId
  )
  if (!isInCartItems) {
    let newCartProduct = {
      title: addItem.title,
      count: 1,
      price: addItem.price,
      uniqueId: addItem.uniqueId,
      categoryId: addItem.categoryId,
      img: addItem.img,
    }
    context.setCartItems(() => [...context.cartItems, newCartProduct])
    window.localStorage.setItem(
      "cart-items",
      JSON.stringify([...context.cartItems, newCartProduct])
    )
  } else {
    let userCart = [...context.cartItems]
    userCart.map((bagProduct) => {
      if (bagProduct.uniqueId === addItem.uniqueId) {
        if (bagProduct.count >= max) {
        } else {
          bagProduct.count += 1
          context.setCartItems(userCart)
          window.localStorage.setItem("cart-items", JSON.stringify(userCart))
        }
      }
      return null
    })
  }
}
const addFavorite = (contextFavorite, addItem) => {
  let exist = contextFavorite.favorite.some(
    (item) => item.uniqueId === addItem.uniqueId
  )
  if (exist) {
  } else {
    contextFavorite.setFavorite([...contextFavorite.favorite, addItem])
  }
}

const addNextList = (contextNextList, addItem) => {
  let exist = contextNextList.nextList.some(
    (item) => item.uniqueId === addItem.uniqueId
  )
  if (exist) {
  } else {
    contextNextList.setNextList([...contextNextList.nextList, addItem])
  }
}
const removeFavorite = (context, removeUniqueId) => {
  let newFavorite = context.favorite.filter(
    (item) => item.uniqueId !== removeUniqueId
  )
  context.setFavorite(newFavorite)
}
const removeNextList = (context, removeUniqueId) => {
  let newNextList = context.nextList.filter(
    (item) => item.uniqueId !== removeUniqueId
  )
  context.setNextList(newNextList)
}

export {
  isLogin,
  formatCurrency,
  addProduct,
  removeProduct,
  addFavorite,
  removeFavorite,
  addNextList,
  removeNextList,
}
