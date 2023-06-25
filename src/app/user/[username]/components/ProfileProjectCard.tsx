import Link from "next/link";
import Image from "next/image";
import { Project } from "@/app/projects/page";

type Props = {
  project: Project;
};

export default function ProfileProjectCard({ project }: Props) {
  return (
    <div className="flex flex-wrap items-center bg-white border border-gray-200 rounded-lg shadow md:max-w-4xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      {/* Project Image */}
      <Link href={`/projects/${project.id}`}>
        <Image
          className=" w-full rounded-t-lg md:max-w-md md:rounded-none md:rounded-l-lg"
          src={project.image_1}
          alt=""
          width={860}
          height={576}
        />
      </Link>
      <div className="flex-col justify-between flex-1 p-5">
        <div>
          <Link href={`/projects/${project.id}`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {project.title}
            </h5>
          </Link>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {project.about}
          </p>
        </div>
        <Link
          href={`/projects/${project.id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Read more
          <svg
            aria-hidden="true"
            className="w-4 h-4 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}
