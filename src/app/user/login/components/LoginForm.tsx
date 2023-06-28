"use client";

import Spinner from "@/app/components/Spinner";
import { useLoginMutation } from "@/store/features/authApiSlice";
import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCredentials, setUser } from "@/store/features/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function LoginForm() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (isAuthenticated) {
    router.push("/projects");
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const credentials = { username, password };
    login(credentials)
      .unwrap()
      .then((user) => {
        dispatch(setCredentials());
        dispatch(
          setUser({
            user: user.username,
            name: user.name,
            profile_pic: user.profile_image,
          })
        );
        router.push("/projects/");
      })
      .catch((err) => {
        toast.error(err.data.detail);
      });
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email or username
        </label>
        <input
          name="email"
          id="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@company.com"
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-50 border border-gray-300 outline-none text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {isLoading ? <Spinner /> : "Sign in"}
      </button>
    </form>
  );
}
