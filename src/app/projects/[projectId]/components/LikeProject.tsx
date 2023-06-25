"use client";
import likeProject from "@/lib/likeProject";

type Props = {
  projectId: number;
  user_liked: boolean;
  likes_count: number;
};

export default async function LikeProject({
  projectId,
  user_liked,
  likes_count,
}: Props) {
  const handleLikeProject = async () => {
    const data = await likeProject(projectId);
    console.log(data);
  };
  return (
    <div className="flex items-center space-x-1">
      <button
        type="button"
        onClick={handleLikeProject}
        className="flex-col items-center px-3 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none dark:bg-gray-600 dark:hover:bg-gray-700"
      >
        <svg
          aria-hidden="true"
          className={`w-8 h-8 ${user_liked ? "text-red-500" : "text-white"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Likes</title>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>

        <span className="sr-only">Likes</span>
        <span className="text-lg font-medium text-white">{likes_count}</span>
      </button>
    </div>
  );
}
