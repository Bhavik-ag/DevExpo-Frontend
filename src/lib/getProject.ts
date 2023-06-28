import axios from "axios";
import { cookies } from "next/headers";

const getProject = async (projectId: string) => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "project/" + projectId;

  const cookieStore = cookies();

  const res = await axios.get(url, {
    withCredentials: true,
    headers: {
      Authorization: "Bearer " + cookieStore.get("token"),
    },
  });
  return res.data;
};

export default getProject;
