type LoginDataType = {
  username: string;
  password: string;
};

const loginUser = async (loginData: LoginDataType) => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "user/login/";
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });
    console.log(res);
    const data = await res.json();
    return data;
  } catch (error) {
    const data = { error: error };
    return data;
  }
};

export default loginUser;
