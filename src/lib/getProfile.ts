import axios from "axios";

const getProfile = async (username: string) => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "user/profile/" + username;
  const res = await axios.get(url, { withCredentials: true });
  return res.data;
};

export default getProfile;
