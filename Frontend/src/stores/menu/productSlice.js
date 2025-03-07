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

// ✅ Fetch products from API with error handling
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    try {
        const response = await fetch('https://food-ordering-app-xg2o.onrender.com/api/products-by-categories');
        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log("Fetched products:", JSON.stringify(data, null, 2)); // ✅ Full API response for debugging
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
                state.products = action.payload; // ✅ Directly assign API response
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default productsSlice.reducer;
export const selectAllProducts = (state) => state.products;
