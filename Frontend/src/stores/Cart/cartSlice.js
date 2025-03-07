import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: JSON.parse(localStorage.getItem("cart")) || []
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingProduct = state.products.find(
                product => product.id === action.payload.id && product.name === action.payload.name
            );
            if (existingProduct) {
                existingProduct.amount += 1;
            } else {
                state.products.push({ ...action.payload, amount: 1 });
            }
            localStorage.setItem("cart", JSON.stringify(state.products));  // Save to localStorage
        },
        clearCart: (state) => {
            state.products = [];
            localStorage.removeItem("cart");  // Clear from localStorage
        },
        incrementProductAmount: (state, action) => {
            state.products = state.products.map(product => 
                product.id === action.payload.id && product.name === action.payload.name 
                ? { ...product, amount: product.amount + 1 } 
                : product
            );
            localStorage.setItem("cart", JSON.stringify(state.products));  // Update localStorage
        },
        decrementProductAmount: (state, action) => {
            state.products = state.products.reduce((acc, product) => {
                if (product.id === action.payload.id && product.name === action.payload.name) {
                    if (product.amount > 1) {
                        acc.push({ ...product, amount: product.amount - 1 });
                    }
                    // If amount is 1, remove from cart
                } else {
                    acc.push(product);
                }
                return acc;
            }, []);
            localStorage.setItem("cart", JSON.stringify(state.products));  // Update localStorage
        }
    }
});

export const cartProducts = state => state.cart.products;
export const { addToCart, clearCart, incrementProductAmount, decrementProductAmount } = cartSlice.actions;
export default cartSlice.reducer;
