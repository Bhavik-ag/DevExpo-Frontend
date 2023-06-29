"use client";

import Maintenance from "@/app/components/Maintenance";
import ProjectPage from "./components/ProjectPage";
import { useRetrieveProjectQuery } from "@/store/features/projectApiSlice";

type User = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
};

export type ReviewType = {
  id: number;
  review_user: string;
  review_user_image: string;
  message: string;
  created: string;
  updated: string;
};

export type Project = {
  id: number;
  contributors: User[];
  title: string;
  about: string;
  description: string;
  demo_link: string;
  repo_link: string;
  views: number;
  image_1: string;
  image_2: string;
  image_3: string;
  image_4: string;
  created: string;
  owner: User;
  reviews: ReviewType[];
  likes_count: number;
  user_liked: boolean;
};

type Params = {
  params: {
    projectId: string;
  };
};

export default function Project({ params: { projectId } }: Params) {
  const { data, isLoading } = useRetrieveProjectQuery(projectId);
  console.log(data);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : data ? (
        <ProjectPage projectData={data} />
      ) : (
        <Maintenance />
      )}
    </>
  );
}
