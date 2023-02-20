import { supabase } from './../../CreateClient'
import { createAsyncThunk } from '@reduxjs/toolkit'

const getProducts = createAsyncThunk(
    'products/getProducts',
    async () => {
        const { data } = await supabase.from('products').select('*')
        return data
    }
)
const getCategories = createAsyncThunk(
    'categories/getCategories',
    async () => {
        const { data } = await supabase.from('categorys').select('*')
        return data
    }
)

export { getProducts, getCategories }
//  change categorys to categories