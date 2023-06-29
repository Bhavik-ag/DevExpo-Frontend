"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks";
import Avatar from "./Avatar";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

const Navbar = ({ selected }: { selected: string }) => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const pathname = usePathname();

  const { isAuthenticated, isLoading, user } = useAppSelector(
    (state) => state.auth
  );

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

  const guestLinks = (
    <>
      <Link
        href="/user/login/"
        className="text-gray-800 hidden sm:block dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
      >
        Log in
      </Link>
      <Link
        href="/user/register/"
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none "
      >
        Get started
      </Link>
    </>
  );

  const authLinks = <>{user && <Avatar user={user} />}</>;

  return (
    <nav className="z-40 sticky w-full bg-white flex-grow-0 flex-shrink border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
      <div className=" flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <div ref={wrapperRef} className=" md:hidden">
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-expanded="false"
            onClick={() => setOpenDropdown(!openDropdown)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={`w-6 h-6 ${openDropdown ? "hidden" : "block"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className={`w-6 h-6 ${openDropdown ? "block" : "hidden"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="absolute left-0 top-full">
            <div
              className={`${
                openDropdown ? "visible" : "hidden"
              } h-screen transition-all fixed duration-500 max-w-[200px] bg-white divide-y divide-gray-100 shadow w-full dark:bg-gray-800 dark:divide-gray-600`}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="avatarButton"
              >
                <li>
                  <Link
                    href={`/`}
                    onClick={() => setOpenDropdown(false)}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/projects/`}
                    onClick={() => setOpenDropdown(false)}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Projects
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
                <li>
                  <Link
                    href="/user/login"
                    onClick={() => setOpenDropdown(false)}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Link href={"/"} className="flex items-center gap-2">
          <Image src="/devexpo.png" width={50} height={20} alt="" />
          <span className="self-center text-xl font-semibold whitespace-nowrap text-black dark:text-white">
            DevExpo
          </span>
        </Link>

        <div className="flex items-center md:order-2">
          {!isLoading
            ? isAuthenticated && user != null
              ? authLinks
              : guestLinks
            : null}
        </div>
        <div
          className={
            "justify-between items-center w-full md:flex md:w-auto md:order-1"
          }
        >
          <ul className="hidden mt-4 font-medium rounded md:flex md:space-x-8 md:mt-0">
            <li>
              <Link
                href="/"
                className={`block py-2 pr-3 pl-2 ${
                  pathname === "/"
                    ? "text-white dark:text-white"
                    : "text-gray-700 dark:text-gray-400"
                } rounded bg-blue-700 md:bg-transparent md:text-blue-700 md:p-0 `}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <Link
                  href={href}
                  className={`block py-2 pr-3 pl-2  ${
                    pathname.startsWith(href)
                      ? "text-white dark:text-white"
                      : "text-gray-700 dark:text-gray-400"
                  } rounded bg-blue-700 md:bg-transparent md:text-blue-700 md:p-0 `}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
