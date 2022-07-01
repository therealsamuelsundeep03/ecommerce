import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi ({
    // naming the api services
    reducerPath : "productApi",
    baseQuery : fetchBaseQuery({ baseUrl : "https://hebewebstore.herokuapp.com"}),
    endpoints: (builder) => ({
        getAllProducts : builder.query({
            query: (products) => `product/${products}` 
        })
    })
})

export const { useGetAllProductsQuery } = productApi 