import { MetadataRoute } from "next";
import getProjects from "@/lib/getProjects";
import { ProjectCardType } from "./projects/page";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const urls = projects.data.map((project: ProjectCardType) => ({
    url: `/project/${project.id}`,
    lastModified: new Date(project.created),
  }));

  return [
    {
      url: "/",
      lastModified: new Date(),
    },
    ...urls,
  ];
}
