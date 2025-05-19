import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const signupService = createApi({
  reducerPath: "signupApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  tagTypes: ["Data"], //used to refetch data automatically
  endpoints: (builder) => ({
    addData: builder.mutation({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Data"], //for refetch data
    }),
  }),
});
export const { useAddDataMutation } = signupService;
