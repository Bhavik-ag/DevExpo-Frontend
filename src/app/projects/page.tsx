import ProjectCard from "./components/ProjectCard";
import getProjects from "@/lib/getProjects";
import Link from "next/link";
import Maintenance from "../components/Maintenance";

export type ProjectCardType = {
  id: number;
  title: string;
  about: string;
  owner: string;
  image_1: string;
  created: string;
};

export const revalidate = 60;

export default async function Projects() {
  const projects: { data: ProjectCardType[] | never[]; status: string } =
    await getProjects();

  if (projects.status === "error") {
    return <Maintenance />;
  } else
    return (
      projects && (
        <section className="mx-auto max-w-7xl px-4 md:px-8 2xl:px-16">
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
          <div className="flex flex-col items-center px-5">
            <div className="mx-auto grid w-full max-w-7 xl items-center space-y-4 py-10 sm:grid-cols-2 sm:gap-6 md:grid-cols-3  sm:space-y-0">
              {projects.data.map((project: ProjectCardType) => (
                <ProjectCard project={project} key={project.id} />
              ))}
            </div>
          </div>
        </section>
      )
    );
}
