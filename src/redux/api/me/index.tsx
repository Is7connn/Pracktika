import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getTodo: builder.query<TODO.GetRes, TODO.GetReq>({
      query: (query) => ({
        url: "/todo",
        method: "GET",
        params: {
          q: query,
          type: "track",
          limit: 10,
        },
      }),
      providesTags: ["islam"],
    }),
    postTodo: builder.mutation<TODO.PostRes, TODO.PostReq>({
      query: (newTodo) => ({
        url: "",
        method: "POST",
        body: newTodo,
      }),
      invalidatesTags: ["islam"],
    }),
  }),
});

export const { useGetTodoQuery, usePostTodoMutation } = api;
