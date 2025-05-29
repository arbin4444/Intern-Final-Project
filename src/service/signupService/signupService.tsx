import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const signupService = createApi({
  reducerPath: "signupApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  tagTypes: ["SignupData"], //used to refetch data automatically
  endpoints: (builder) => ({
    addData: builder.mutation({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SignupData"], //for refetch data
    }),
  }),
});
export const { useAddDataMutation } = signupService;
