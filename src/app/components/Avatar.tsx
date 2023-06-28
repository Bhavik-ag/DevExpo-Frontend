"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { logOut as setLogout } from "@/store/features/authSlice";
import { useLogOutMutation } from "@/store/features/authApiSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";

type Prop = {
  user: {
    username: string;
    name: string;
    profile_pic: string;
  };
};

export default function Avatar({ user }: Prop) {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  const [logOut] = useLogOutMutation();
  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    logOut(undefined)
      .unwrap()
      .then(() => {
        dispatch(setLogout());
      })
      .finally(() => {
        router.push("/");
      });
  };

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <Image
        className="w-10 h-10 rounded-full cursor-pointer"
        src={user.profile_pic}
        alt="User dropdown"
        onClick={() => setOpenDropdown(!openDropdown)}
        width={40}
        height={40}
      />

      <div
        className={`z-20 ${
          openDropdown ? "visible" : "hidden"
        } absolute right-0  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
      >
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>{user.name}</div>
          <Link
            href={`/user/${user.username}`}
            onClick={() => setOpenDropdown(false)}
            className="font-medium truncate"
          >
            @{user.username}
          </Link>
        </div>
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="avatarButton"
        >
          <li>
            <Link
              href={`/user/${user.username}`}
              onClick={() => setOpenDropdown(false)}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              href="/projects/add"
              onClick={() => setOpenDropdown(false)}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Add Project
            </Link>
          </li>
        </ul>
        <div className="py-1">
          <p
            onClick={handleLogOut}
            className="block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Sign out
          </p>
        </div>
      </div>
    </div>
  );
}
