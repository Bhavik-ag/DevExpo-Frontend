import { apiSlice } from "../services/apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    retrieveUser: builder.query({
      query: (username: string) => "/user/profile/" + username,
    }),
    updateUser: builder.mutation({
      query: (data: { userData: FormData; username: string }) => ({
        url: `/user/profile/${data.username}/update/`,
        method: "PATCH",
        body: data.userData,
      }),
    }),
    login: builder.mutation({
      query: (credentials: { username: string; password: string }) => ({
        url: "/user/login/",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials: {
        username: string;
        email: string;
        password: string;
      }) => ({
        url: "/user/register/",
        method: "POST",
        body: credentials,
      }),
    }),
    verify: builder.mutation({
      query: () => ({
        url: "/user/verify/",
        method: "POST",
      }),
    }),
    logOut: builder.mutation({
      query: () => ({
        url: "/user/logout/",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRetrieveUserQuery,
  useUpdateUserMutation,
  useLoginMutation,
  useRegisterMutation,
  useVerifyMutation,
  useLogOutMutation,
} = authApiSlice;
