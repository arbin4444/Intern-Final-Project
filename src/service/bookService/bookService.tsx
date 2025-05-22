import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {BookTypes} from "../../types/books/bookTypes"
export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  }),
  tagTypes : ['Data'], //used to refetch data automatically
  endpoints: (builder) => ({
    getData: builder.query<BookTypes[], void>({
      query: () => "/books",
    //   transformResponse: (data:BookTypes[])=>data.reverse(),
      providesTags: ['Data'] //for refetch data
    }),
    addData : builder.mutation ({
      query : (data)=>({
        url : '/books',
        method : 'POST',
        body : data,
      }),
      invalidatesTags: ['Data']//for refetch data
    }),
    updateData : builder.mutation({
      query : ({id,...updatedData})=>({
        url : `/books/${id}`,
        method : "PUT",
        body : updatedData,
      }),
      invalidatesTags: ['Data']
    }),
    deleteData : builder.mutation({
      query : (id)=>({
        url : `/books/${id}`,
        method : 'DELETE',
      }),
      invalidatesTags: ['Data']
    }),
  }),
  
});

export const { useGetDataQuery, useAddDataMutation,useUpdateDataMutation,useDeleteDataMutation} = booksApi;
