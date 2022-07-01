import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState =  {
    items : [],
    status : null,
    err : null
} 

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (products,{ rejectWithValue }) => {
        try{
            const { data } = await axios.get(`https://hebewebstore.herokuapp.com/product/${products}`);
            return data;
        }
        catch(err){
            return rejectWithValue(`Error in fetching the products::, ${err.response.data}`)
        }
    }
)

const productSlice = createSlice({
    name : "products",
    initialState,
    // to handle action creator and to handle state
    reducers : {},
    // to handle action type
    extraReducers : {
        [fetchProducts.pending] : (state,action) => {
            state.status = "pending"
        },
        [fetchProducts.fulfilled] : (state,action) => {
            state.status = "success"
            state.items = action.payload
        },
        [fetchProducts.rejected] : (state,action) => {
            state.status = "rejected"
            state.err = action.payload
        },
    }
})

export default productSlice.reducer;