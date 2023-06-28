import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white flex-shrink flex-grow-0 rounded-lg shadow dark:bg-gray-900 m-4">
      <div className="w-full p-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center mb-4 sm:mb-0">
            <Image src="/devexpo.png" width={50} height={20} alt="" />
            <span className="ml-2 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              DevExpo
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link href="/" className="mr-4 hover:underline md:mr-6 ">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="mr-4 hover:underline md:mr-6">
                Projects
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <Link href="/" className="hover:underline">
            DevExpo
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
