import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useCreateProjectMutation } from "@/store/features/projectApiSlice";
import Spinner from "@/app/components/Spinner";
import { useRouter } from "next/navigation";

type ProjectDataType = {
  title: string;
  about: string;
  repo_link: string;
  demo_link: string;
  description: string;
  thumbnail: File | null;
  images: File[];
};

const initalState: ProjectDataType = {
  title: "",
  about: "",
  repo_link: "",
  demo_link: "",
  description: "",
  thumbnail: null,
  images: [],
};

export default function ProjectForm() {
  const [projectData, setProjectData] = useState<ProjectDataType>(initalState);

  const { title, about, repo_link, demo_link, description, thumbnail, images } =
    projectData;

  const [createProject, { isLoading }] = useCreateProjectMutation();

  const router = useRouter();

  const handleThumbnailImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProjectData({
        ...projectData,
        thumbnail: e.target.files ? e.target.files[0] : null,
      });
    }
  };

  const handleSupportingImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Limit the number of images to 3
      if (e.target.files.length > 3) {
        toast.error("You can only upload 3 images");
        return;
      }
      setProjectData({
        ...projectData,
        images: e.target.files ? Array.from(e.target.files) : [],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("about", about);
    formData.append("repo_link", repo_link);
    formData.append("demo_link", demo_link);
    formData.append("description", description);

    if (thumbnail) {
      formData.append("image_1", thumbnail);
    }

    // get index with image
    images.forEach((image, index) => {
      formData.append(`image_${index + 2}`, image);
    });

    console.log(formData);

    createProject(formData)
      .unwrap()
      .then((res) => {
        router.push(`/projects/${res.id}`);
        toast.success("Project Added Successfully !!");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Add a new project
        </h2>
        {/* Project Thumbnail */}
        {thumbnail && (
          <div className="sm:col-span-2 flex justify-center mb-6">
            <Image
              src={URL.createObjectURL(thumbnail)}
              alt=""
              className="w-full h-auto"
              width={60}
              height={21.6}
            />
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {/* Project Title */}
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Project Title *
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={title}
                onChange={(e) =>
                  setProjectData({ ...projectData, title: e.target.value })
                }
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Project Title"
                required
              />
            </div>
            {/* About */}
            <div className="sm:col-span-2">
              <label
                htmlFor="about"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                About the Project *
              </label>
              <textarea
                id="about"
                rows={2}
                maxLength={100}
                value={about}
                onChange={(e) => {
                  setProjectData({ ...projectData, about: e.target.value });
                }}
                className="block outline-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Short description about the project (max 100 characters)"
              ></textarea>
            </div>
            {/* Repo Link */}
            <div className="w-full">
              <label
                htmlFor="repo_link"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Repo Link
              </label>
              <input
                type="text"
                name="repo_link"
                id="repo_link"
                value={repo_link}
                onChange={(e) => {
                  setProjectData({ ...projectData, repo_link: e.target.value });
                }}
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Project Repository Link"
              />
            </div>
            {/* Demo Link */}
            <div className="w-full">
              <label
                htmlFor="demo_link"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Demo Link
              </label>
              <input
                type="text"
                name="demo_link"
                id="demo_link"
                value={demo_link}
                onChange={(e) => {
                  setProjectData({ ...projectData, demo_link: e.target.value });
                }}
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Project Demo Link"
              />
            </div>
            {/* Description */}
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description *
              </label>
              <textarea
                id="description"
                rows={4}
                maxLength={1000}
                value={description}
                onChange={(e) => {
                  setProjectData({
                    ...projectData,
                    description: e.target.value,
                  });
                }}
                required
                className="block outline-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Detailed description about the project (max 1000 characters)"
              ></textarea>
            </div>
            {/* Thumbnail Image */}
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Thumbnail Image *
              </label>
              <label
                htmlFor="thumbnail-images"
                className="flex flex-col items-center justify-center w-full h-22 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                {thumbnail ? (
                  <div className="flex flex-col items-center justify-center py-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {thumbnail.name}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Thumbnail Image of the project
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Prefered ratio:</span>{" "}
                      16:9
                    </p>
                  </div>
                )}
                <input
                  id="thumbnail-images"
                  type="file"
                  name="thumbnail-images"
                  onChange={handleThumbnailImage}
                  accept="image/png, image/jpeg, image/jpg"
                  className="hidden"
                  required
                />
              </label>
            </div>
            {/* Supporting Images */}
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Supporting Images (Max. 3 Images)
              </label>
              <label
                htmlFor="supporting-images"
                className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                {images.length > 0 ? (
                  <div className="flex flex-col items-center justify-center py-2">
                    {images.map((image) => (
                      <p
                        className="text-sm text-gray-500 dark:text-gray-400"
                        key={image.name}
                      >
                        {image.name}
                      </p>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Supporting Images of the project
                    </p>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Prefered ratio:</span>{" "}
                      16:9
                    </p>
                  </div>
                )}

                <input
                  id="supporting-images"
                  type="file"
                  name="supporting-images"
                  onChange={handleSupportingImages}
                  accept="image/png, image/jpeg, image/jpg"
                  className="hidden"
                  multiple
                />
              </label>
            </div>
            <div className="sm:col-span-2 grid sm:grid-cols-3 grid-cols-1 gap-2">
              {images.length > 0 ? (
                <Image
                  src={URL.createObjectURL(images[0])}
                  alt="supporting image"
                  className="w-full"
                  width={200}
                  height={100}
                />
              ) : null}
              {images.length > 1 ? (
                <Image
                  src={URL.createObjectURL(images[1])}
                  className="w-full"
                  alt="supporting image"
                  width={200}
                  height={100}
                />
              ) : null}
              {images.length > 2 ? (
                <Image
                  src={URL.createObjectURL(images[2])}
                  className="w-full"
                  alt="supporting image"
                  width={200}
                  height={100}
                />
              ) : null}
            </div>
          </div>
          {/* Submit Button */}
          <div className="flex w-full justify-center">
            <button
              type="submit"
              className="flex justify-center w-full max-w-lg items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              {isLoading ? <Spinner /> : "Add project"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
