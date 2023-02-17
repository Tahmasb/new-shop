import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import productsSliceReducer from './features/productsSlice'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants'

const rootReducer = combineReducers({
    products: productsSliceReducer
})

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['products']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
})
let persistor = persistStore(store)
export { persistor, store }














// import { configureStore } from '@reduxjs/toolkit'
// import productsSliceReducer from './features/productsSlice'

// export const store = configureStore({
//     reducer: {
//         products: productsSliceReducer
//     }
// })