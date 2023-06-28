import Link from "next/link";
import Image from "next/image";
import RegisterForm from "./components/RegisterForm";

export default function Register() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
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
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create your account
            </h1>
            <RegisterForm />
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/user/login/"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
