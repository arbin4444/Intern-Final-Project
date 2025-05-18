import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const loginService = createApi ({
    reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
  }),
  tagTypes : ['Data'], //used to refetch data automatically
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => "/users",
      transformResponse: (data)=>data.reverse(),
      providesTags: ['Data'] //for refetch data
    }),
    addData : builder.mutation ({
      query : (data)=>({
        url : '/user',
        method : 'POST',
        body : data,
      }),
      invalidatesTags: ['Data']//for refetch data
    }), 
    deleteData : builder.mutation({
      query : (id)=>({
        url : `/users/${id}`,
        method : 'DELETE',
      }),
      invalidatesTags: ['Data']
    }),
    updateData : builder.mutation({
      query : ({id,...updatedData})=>({
        url : `/users/${id}`,
        method : "PUT",
        body : updatedData,
      }),
      invalidatesTags: ['Data']
    }),
  }),
})
export const { useGetDataQuery, useAddDataMutation, useDeleteDataMutation, useUpdateDataMutation} = loginService;