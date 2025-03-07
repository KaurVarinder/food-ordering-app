import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await fetch('https://food-ordering-app-xg2o.onrender.com/api/products-by-categories');
    const data = await response.json();
    return data;
})

const initialState = {
    products: [],
    error: null,
    status: 'idle',
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.products = [...action.payload.data]
        });
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.status = 'pending'
        })
    }
})

export const { getProducts } = productsSlice.actions

export default productsSlice.reducer

export const selectAllProducts = state => state.products
