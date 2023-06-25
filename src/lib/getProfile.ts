const getProfile = async (username: string) => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "user/profile/" + username;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }
  return await res.json();
};

export default getProfile;
