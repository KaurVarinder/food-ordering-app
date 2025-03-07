import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./Cart/cartSlice";
import productReducer from "./menu/productSlice"
import addressReducer from "./userInfo/addressSlice";


const rootReducer = combineReducers(
    {
        cart: cartReducer,
        products: productReducer,
        address: addressReducer
    }
);

export default rootReducer;