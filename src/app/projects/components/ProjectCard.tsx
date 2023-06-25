import Image from "next/image";
import { Project } from "../page";
import Link from "next/link";

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  return (
    <div className="aspect-[15/10] w-auto rounded-lg md:aspect-auto md:h-[400px bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
      <Link href={`/projects/${project.id}`}>
        <Image
          className="rounded-t-lg"
          src={project.image_1}
          alt=""
          width={860}
          height={576}
        />
      </Link>
      <div className="p-5">
        <Link href={`/projects/${project.id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {project.title}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {project.about}
        </p>
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
};

export default ProjectCard;
