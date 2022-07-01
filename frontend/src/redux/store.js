import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { productApi } from "./features/productsApi";

const store = configureStore ( 
    {reducer : rootReducer},
    {
        middleware : (getDefaultMiddleware) => {
            return getDefaultMiddleware.concat(productApi.middleware)
        }
    }
);

export default store;
