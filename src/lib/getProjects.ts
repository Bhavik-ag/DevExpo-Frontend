const getProjects = async () => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "project/";
  console.log(url);
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }
  return await res.json();
};

export default getProjects;
