import { apiSlice } from "../services/apiSlice";

const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    retrieveProject: builder.query({
      query: (projectId: string) => "/project/" + projectId,
    }),
    retrieveProjects: builder.query({
      query: () => "/project/",
    }),
    likeProject: builder.mutation({
      query: (projectId: number) => ({
        url: "/project/" + projectId + "/like/",
      }),
    }),
    createReview: builder.mutation({
      query: (data: { message: string; projectId: number }) => ({
        url: "/project/" + data.projectId + "/review/",
        body: { message: data.message },
        method: "POST",
      }),
    }),
    createProject: builder.mutation({
      query: (data) => ({
        url: "/project/create/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useRetrieveProjectQuery,
  useRetrieveProjectsQuery,
  useLikeProjectMutation,
  useCreateReviewMutation,
  useCreateProjectMutation,
} = projectApiSlice;
