const likeProject = async (projectId: number) => {
  const url =
    process.env.NEXT_PUBLIC_API_BASE_URL + "project/" + projectId + "/like/";
  const res = await fetch(url, {
    credentials: "include",
  });
  console.log(res);
  if (!res.ok) {
    if (res.status === 401) {
      const data = { error: "Unauthorized" };
      return data;
    } else {
      throw new Error("Failed to like/dislike project");
    }
  }
  return await res.json();
};

export default likeProject;
