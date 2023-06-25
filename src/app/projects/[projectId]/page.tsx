import likeProject from "@/lib/likeProject";
import getProject from "@/lib/getProject";
import ProjectGallery from "../components/ProjectGallery";
import { Project } from "../page";
import Link from "next/link";
import LikeProject from "./components/LikeProject";

type Params = {
  params: {
    projectId: string;
  };
};

export default async function Project({ params: { projectId } }: Params) {
  const project: Project = await getProject(projectId);

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 md:px-8 2xl:px-16">
        <div className="pt-8">
          <div className="flex items-center">
            <ol className="flex w-full items-center overflow-hidden">
              <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
                <Link href="/">Home</Link>
              </li>
              <li className="text-body mt-0.5 text-base">/</li>
              <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
                <Link className="capitalize" href="/projects">
                  projects
                </Link>
              </li>
              <li className="text-body mt-0.5 text-base">/</li>
              <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
                <Link className="capitalize" href={`/projects/${project.id}`}>
                  {project.title}
                </Link>
              </li>
            </ol>
          </div>
        </div>
        <div className="block grid-cols-1 items-start gap-x-5 pb-10 pt-7 lg:grid lg:pb-14 xl:gap-x-14 2xl:pb-20">
          <div className="mb-3.5 flex items-center justify-between">
            <div>
              <h2 className="text-heading text-lg font-bold md:text-xl lg:text-2xl 2xl:text-3xl">
                {project.title}
              </h2>
              <p className="text-body text-sm leading-6 lg:leading-8">
                {project.about}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="flex-col items-center px-3 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none  dark:bg-gray-600 dark:hover:bg-gray-700">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Views</title>
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />{" "}
                  </svg>

                  <span className="sr-only">Likes</span>
                  <span className="text-lg font-medium text-white">
                    {project.views}
                  </span>
                </div>
              </div>
              <LikeProject
                projectId={project.id}
                user_liked={project.user_liked}
                likes_count={project.likes_count}
              />
            </div>
          </div>
          <ProjectGallery
            images={[
              project.image_1,
              project.image_2,
              project.image_3,
              project.image_4,
            ]}
          />
          <div className="col-span-1 pt-8 lg:pt-0">
            <div className="my-7 border-b border-gray-300 pb-7">
              <p className="text-body text-sm leading-6  lg:text-base lg:leading-8">
                {project.description}
              </p>
              <div className="mt-5 flex items-center ">
                Contributors -
                {project.contributors.map((contributor) => (
                  <div
                    className="flex items-center space-x-2"
                    key={contributor.username}
                  >
                    <div className="flex items-center space-x-1">
                      <span className="sr-only">Likes</span>
                      <Link href={`/profile/${contributor.username}`}>
                        <span className="text-lg font-medium text-white">
                          @{contributor.username}
                        </span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-b border-gray-300 pb-3  ">
              <div className="mb-4">
                <ul className="space-y-5 pb-1 text-sm">
                  <li>
                    <span className="text-heading  inline-block pr-2 font-semibold">
                      Demo URL:
                    </span>
                    <Link
                      className="cursor-pointer hover:underline"
                      href={project.demo_link}
                      target="_blank"
                    >
                      {project.demo_link}
                    </Link>
                  </li>
                  <li>
                    <span className="text-heading inline-block pr-2 font-semibold">
                      Repo URL:
                    </span>
                    <Link
                      className="cursor-pointer hover:underline"
                      href={project.repo_link}
                      target="_blank"
                    >
                      {project.repo_link}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
