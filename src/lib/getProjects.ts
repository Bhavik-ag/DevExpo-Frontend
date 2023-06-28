import axios from "axios";
import { ProjectCardType } from "@/app/projects/page";

const getProjects = (): { data: ProjectCardType[]; status: string } => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "project/";

  const response = axios
    .get(url)
    .then((res) => {
      return {
        data: res.data,
        status: "success",
      };
    })
    .catch((err) => {
      return {
        data: [],
        status: "error",
      };
    });

  return response;
};

export default getProjects;
