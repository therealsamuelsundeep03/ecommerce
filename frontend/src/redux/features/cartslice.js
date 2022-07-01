import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems:localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity:0,
    cartTotalAmount:0
}

const cartSlice = createSlice ({
    name : "cart",
    initialState,
    reducers : {
        addToCart(state,action){
            const index = state.cartItems.findIndex(prod => prod.id === action.payload.id);
            if(index >= 0){
                state.cartItems[index].qty += 1;
                alert("Increased product quantity")
            }
            else{
                state.cartItems.push({...action.payload,qty:1});
                alert("Added product to the cart")
            }
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems));
        },
        removeFromCart(state,action){
            state.cartItems = state.cartItems.filter(prod => prod.id !== action.payload.id);
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems));
        },
        decreaseQty(state,action){
            const index = state.cartItems.findIndex(prod => prod.id === action.payload.id);
            console.log(state.cartItems[index].qty)
            if(state.cartItems[index].qty >= 2){
                state.cartItems[index].qty -= 1 ;
                localStorage.setItem('cartItems',JSON.stringify(state.cartItems));
            }
        }
    },
    extraReducers : {}
}) 

export const { addToCart,removeFromCart,decreaseQty } = cartSlice.actions; 
export default cartSlice.reducer;

// const index = state.cartItems.findIndex(prod => prod.id === action.payload.id);
// console.log(index)
// if(index >= 0){
//     state.cartItems[index].quantity += 1;
//     localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
// }else{
//     state.cartItems.push({...action.payload,qty:1});
//     localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
//     toast.success("product added to the cart", {
//         position:"bottom-left"
//     })
// }           
// // localStorage.setItem("cartItems",JSON.stringify(state.cartItems));