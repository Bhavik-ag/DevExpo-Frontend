"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const Navbar = ({ selected }: { selected: string }) => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const pathname = usePathname();

  return (
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <Link href={"/"} className="flex items-center gap-2">
          <Image src="/devexpo.png" width={50} height={20} alt="" />
          <span className="self-center text-xl font-semibold whitespace-nowrap text-black dark:text-white">
            DexExpo
          </span>
        </Link>

        <div className="flex items-center md:order-2">
          <Link
            href="/user/login/"
            className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
          >
            Log in
          </Link>
          <Link
            href="/user/register/"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none "
          >
            Get started
          </Link>
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
            onClick={() => setOpenDropdown(!openDropdown)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={`w-6 h-6 ${openDropdown ? "block" : "hidden"}`}
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
              className={`w-6 h-6 ${openDropdown ? "hidden" : "block"}`}
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
        </div>
        <div
          className={`justify-between items-center w-full md:flex md:w-auto md:order-1 ${
            openDropdown ? "hidden" : "visible"
          }`}
          id="mobile-menu-2"
        >
          <ul className="flex flex-col mt-4 font-medium rounded md:flex-row md:space-x-8 md:mt-0">
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

            {/* <li>
              <Link
                href="/projects"
                className={`block py-2 pr-3 pl-2  ${
                  pathname.startsWith("/projects")
                    ? "text-white dark:text-white"
                    : "text-gray-700 dark:text-gray-400"
                } rounded bg-blue-700 md:bg-transparent md:text-blue-700 md:p-0 `}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className={`block py-2 pr-3 pl-2  ${
                  pathname.startsWith("/features")
                    ? "text-white"
                    : "text-gray-700 dark:text-gray-400"
                } rounded bg-blue-700 md:bg-transparent md:text-blue-700 md:p-0`}
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className={`block py-2 pr-3 pl-2  ${
                  pathname.startsWith("/contact")
                    ? "text-white"
                    : "text-gray-700 dark:text-gray-400"
                } rounded bg-blue-700 md:bg-transparent md:text-blue-700 md:p-0`}
              >
                Contact
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
