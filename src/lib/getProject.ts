import axios from "axios";

const getProject = async (projectId: string) => {
  const url =
    process.env.NEXT_PUBLIC_API_BASE_URL + "project/" + projectId + "/";

  const res = await axios.get(url, {
    withCredentials: true,
  });
  return res.data;
};

export default getProject;
