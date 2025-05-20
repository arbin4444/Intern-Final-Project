import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {BookTypes} from "../../types/books/bookTypes"
export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  tagTypes : ['Data'], //used to refetch data automatically
  endpoints: (builder) => ({
    getData: builder.query<BookTypes[], void>({
      query: () => "/books",
    //   transformResponse: (data:BookTypes[])=>data.reverse(),
      providesTags: ['Data'] //for refetch data
    }),
  }),
});

export const { useGetDataQuery} = booksApi;
