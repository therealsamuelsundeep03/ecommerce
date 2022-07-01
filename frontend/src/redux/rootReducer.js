import { combineReducers } from "redux";

import productReducer from "./features/productslice";
import { productApi } from './features/productsApi';
import cartReducer from "./features/cartslice";

const rootReducer = combineReducers({
    products : productReducer,
    [productApi.reducerPath] : productApi.reducer,
    cart  : cartReducer,
})

export default rootReducer;