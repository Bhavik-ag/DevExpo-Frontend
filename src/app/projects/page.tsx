import ProjectCard from "./components/ProjectCard";
import getProjects from "@/lib/getProjects";
import Link from "next/link";

type Contributors = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
};

export type Project = {
  id: number;
  contributors: Contributors[];
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
  owner: number;
  likes_count: number;
  user_liked: boolean;
};

export default async function Projects() {
  const projects = await getProjects();
  console.log(projects);

  return (
    <main className="mx-auto max-w-7xl px-4 md:px-8 2xl:px-16">
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
          </ol>
        </div>
      </div>
      <div className="flex min-h-screen flex-col items-center px-5">
        <div className="mx-auto grid w-full max-w-7 xl items-center space-y-4 py-10 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 sm:space-y-0 lg:grid-cols-4">
          {projects.map((project: Project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      </div>
    </main>
  );
}
