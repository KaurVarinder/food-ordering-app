import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    try {
        const response = await fetch('https://food-ordering-app-xg2o.onrender.com/api/products-by-categories');
        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        console.log("API Response:", JSON.stringify(data, null, 2)); 
        return data?.data || []; 
    } catch (error) {
        console.error("API fetch error:", error);
        throw error;
    }
});

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
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.products = action.payload; 
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default productsSlice.reducer;
export const selectAllProducts = (state) => state.products;
