const likeProject = async (projectId: number) => {
  const url =
    process.env.NEXT_PUBLIC_API_BASE_URL + "project/" + projectId + "/like/";
  const res = await fetch(url, { next: { revalidate: 1 } });
  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("You must be logged in to like/dislike projects");
    } else {
      throw new Error("Failed to like/dislike project");
    }
  }
  return await res.json();
};

export default likeProject;
