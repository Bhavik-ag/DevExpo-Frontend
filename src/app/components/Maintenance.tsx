import Link from "next/link";
import Image from "next/image";

export default function Maintenance() {
  return (
    <section className="bg-white w-full flex justify-center dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-md self-center flex flex-col items-center text-center lg:py-16 lg:px-12">
        <Link
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            src="/devexpo.png"
            className="mr-2"
            alt=""
            width={60}
            height={21.6}
          />
          <span className="self-center text-3xl font-semibold whitespace-nowrap text-black dark:text-white">
            DexExpo
          </span>
        </Link>
        <h1 className="mb-4 text-3xl font-bold tracking-tight leading-none text-gray-900 lg:mb-6 md:text-5xl xl:text-6xl dark:text-white">
          We&apos;ve got something special for you
        </h1>
        <p className="font-light text-gray-500 md:text-lg xl:text-xl dark:text-gray-400">
          Unfortunately this site is down for a bit of maintenance right now.
          But soon we&apos;ll be up with a new library of projects.
        </p>
      </div>
    </section>
  );
}
