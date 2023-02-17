import { getProducts, getCategories } from './../thunks/productsThunks'
import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    loading: false,
    products: [],
    favorites: [],
    categories: [],
    nextList: [],
    cartItems: []
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addCart: (state, { payload }) => {
            let exist = state.cartItems.some(item => item.uniqueId === payload.uniqueId)
            if (!exist) {
                let newCartProduct = {
                    title: payload.title,
                    count: 1,
                    price: payload.price,
                    uniqueId: payload.uniqueId,
                    categoryId: payload.categoryId,
                    img: payload.img,
                }
                state.cartItems.push(newCartProduct)
            } else {
                state.cartItems.map(item => {
                    if (item.uniqueId === payload.uniqueId) {
                        item.count >= 10 ? item : item.count++
                    }

                })
            }

        },
        deleteCart: (state, { payload }) => {
            state.cartItems.map(item => {
                if (item.uniqueId === payload) {
                    if (item.count > 1) item.count--
                    else {
                        state.cartItems = state.cartItems.filter(cartItem => cartItem.uniqueId !== payload)
                    }
                }
            })
        },
        cleanCart: (state, action) => {
            state.cartItems = []
        },
        addFavorite: (state, { payload }) => {
            let exist = state.favorites.some(item => item.uniqueId === payload)
            exist ? null : state.favorites.push(payload)
        },
        deleteFavorite: (state, { payload }) => {
            state.favorites = state.favorites.filter(item => item.uniqueId !== payload)
        },
        addNextList: (state, { payload }) => {
            let exist = state.nextList.some(item => item.uniqueId === payload.uniqueId)
            exist ? null : state.nextList.push(payload)
        },
        deleteNextList: (state, { payload }) => {
            state.nextList = state.nextList.filter(item => item.uniqueId !== payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload
                state.loading = false
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categories = action.payload
            })

    }
})
export const { cleanCart, deleteCart, addFavorite, deleteFavorite, addNextList, deleteNextList, addCart } = productsSlice.actions
export default productsSlice.reducer