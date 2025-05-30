import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BookTypes } from "../../../types/books/bookTypes";
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
  tagTypes: ["bookData"], //used to refetch data automatically
  endpoints: (builder) => ({
    getData: builder.query<BookTypes[], void>({
      query: () => "/books",
      //   transformResponse: (data:BookTypes[])=>data.reverse(),
      providesTags: ["bookData"], //for refetch data
    }),
    addData: builder.mutation({
      query: (data) => ({
        url: "/books",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bookData"], //for refetch data
    }),
    updateData: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["bookData"],
    }),
    deleteData: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["bookData"],
    }),
    searchData: builder.query<BookTypes[], string>({
      query: (searchTerm) => `/search?query=${encodeURIComponent(searchTerm)}`,
    }),
    buyBooks: builder.mutation({
      query: (purchaseData: {
        items: { bookId: number; quantity: number }[];
      }) => ({
        url: "/buy",
        method: "POST",
        body: purchaseData,
      }),
      invalidatesTags: ["bookData"], // Refresh book list to update quantity
    }),
  }),
});

export const {
  useGetDataQuery,
  useAddDataMutation,
  useUpdateDataMutation,
  useDeleteDataMutation,
  useSearchDataQuery,
  useBuyBooksMutation,
} = booksApi;
