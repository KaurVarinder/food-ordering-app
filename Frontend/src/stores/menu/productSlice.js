// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const initialState = {
//     products: [],
//     error: null,
//     status: 'idle',
// };

// export const productsSlice = createSlice({
//     name: 'products',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(fetchProducts.fulfilled, (state, action) => {
//             state.status = 'fulfilled'
//             state.products = [...action.payload.data]
//         });
//         builder.addCase(fetchProducts.pending, (state, action) => {
//             state.status = 'pending'
//         })
//     }
// })

// export const { getProducts } = productsSlice.actions

// export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
//     const response = await fetch('https://food-ordering-app-xg2o.onrender.com/api/products-by-categories');
//     const data = await response.json();
//     return data;
// })

// export default productsSlice.reducer

// export const selectAllProducts = state => state.products

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Define fetchProducts BEFORE using it in createSlice
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await fetch('https://food-ordering-app-xg2o.onrender.com/api/products-by-categories');
    
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    
    const data = await response.json();
    return data?.data || [];  // ✅ Ensure data exists, default to empty array
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
                state.error = null;  // ✅ Clear previous errors
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.products = action.payload; // ✅ Directly assign the array
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || "Something went wrong"; // ✅ Default error message
            });
    }
});

export default productsSlice.reducer;

// ✅ Fix: Select only the products array
export const selectAllProducts = (state) => state.products.products;
