import getProfile from "@/lib/getProfile";
import { Project } from "@/app/projects/page";
import Link from "next/link";
import Image from "next/image";
import ProfileProjectCard from "./components/ProfileProjectCard";

type Params = {
  params: {
    username: string;
  };
};

type Profile = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  profile: {
    bio: string;
    profile_pic: string;
    github: string;
    linkedin: string;
    twitter: string;
    website: string;
  };
  projects: Project[];
};

export default async function UserProfile({ params: { username } }: Params) {
  const user: Profile = await getProfile(username);

  return (
    <>
      <section className="bg-white dark:bg-gray-900 flex justify-center">
        <div className="flex flex-wrap max-w-screen-xl px-4 mx-auto mt-4 gap-8 py-8">
          <div className="flex justify-center ">
            {user.profile && user.profile.profile_pic && (
              <Image
                src={user.profile.profile_pic}
                className="object-cover w-40 h-40 rounded-full shadow-lg lg:w-50 lg:h-50"
                width={150}
                height={150}
                alt=""
              />
            )}
          </div>
          <div className="flex-col items-center justify-center">
            <Link href={`/user/${user.username}`}>
              <span>@{user.username}</span>
            </Link>
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              {user.first_name} {user.last_name}
            </h1>
            {user.profile && (
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                {user.profile.bio}
              </p>
            )}
          </div>
        </div>
      </section>
      {/* Social Links */}
      <section className="flex-col items-center">
        <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Social Links
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 max-w-screen-md px-4 mx-auto gap-4 sm:gap-8 py-8">
          {/* Github */}
          {user.profile.github && (
            <div className="flex justify-center">
              <Link
                href={user.profile.github}
                target="_blank"
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  fill="currentColor"
                  className="w-12 h-12 mr-3"
                  version="1.1"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                  ></path>
                </svg>
                <span className="w-full text-lg">Github</span>
              </Link>
            </div>
          )}

          {/* LinkedIn */}
          {user.profile.linkedin && (
            <div className="flex justify-center">
              <Link
                href={user.profile.linkedin}
                target="_blank"
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 mr-3"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                >
                  <path d="M444.17,32H70.28C49.85,32,32,46.7,32,66.89V441.61C32,461.91,49.85,480,70.28,480H444.06C464.6,480,480,461.79,480,441.61V66.89C480.12,46.7,464.6,32,444.17,32ZM170.87,405.43H106.69V205.88h64.18ZM141,175.54h-.46c-20.54,0-33.84-15.29-33.84-34.43,0-19.49,13.65-34.42,34.65-34.42s33.85,14.82,34.31,34.42C175.65,160.25,162.35,175.54,141,175.54ZM405.43,405.43H341.25V296.32c0-26.14-9.34-44-32.56-44-17.74,0-28.24,12-32.91,23.69-1.75,4.2-2.22,9.92-2.22,15.76V405.43H209.38V205.88h64.18v27.77c9.34-13.3,23.93-32.44,57.88-32.44,42.13,0,74,27.77,74,87.64Z"></path>
                </svg>

                <span className="w-full text-lg">LinkedIn</span>
              </Link>
            </div>
          )}

          {/* Twitter */}
          {user.profile.twitter && (
            <div className="flex justify-center">
              <Link
                href={user.profile.twitter}
                target="_blank"
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 mr-3"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
                </svg>
                <span className="w-full text-lg">Twitter</span>
              </Link>
            </div>
          )}

          {/* Website */}
          {user.profile.website && (
            <div className="flex justify-center">
              <Link
                href={user.profile.twitter}
                target="_blank"
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 mr-3"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"></path>
                </svg>
                <span className="w-full text-lg">Website</span>
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="flex-col items-center px-5">
        <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Projects
        </h3>
        <div className="mx-auto flex w-full max-w-7 xl justify-center space-y-4 py-10 sm:gap-6 sm:space-y-0">
          {user.projects.map((project: Project) => (
            <ProfileProjectCard project={project} key={project.id} />
          ))}
        </div>
      </section>
    </>
  );
}
