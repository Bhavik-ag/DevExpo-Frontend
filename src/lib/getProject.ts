const getProject = async (projectId: string) => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "project/" + projectId;
  console.log(url);
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }
  return await res.json();
};

export default getProject;
