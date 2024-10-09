import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    generateCode: builder.mutation<unknown, string>({
      query: (prompt) => ({
        url: "/",
        method: "POST",
        body: {prompt: prompt},
      }),
    }),
  }),
});

export const { useGenerateCodeMutation } = api;
