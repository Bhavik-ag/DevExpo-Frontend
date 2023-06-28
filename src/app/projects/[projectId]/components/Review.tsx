import { ReviewType } from "../page";
import Image from "next/image";
import Link from "next/link";

export default function Review({ review }: { review: ReviewType }) {
  const created = new Date(review.created);

  return (
    <div className="pl-5 mb-4">
      <div className="flex items-center mb-4 space-x-4">
        <Link href={`/user/${review.review_user}`}>
          <Image
            src={review.review_user_image}
            className="w-10 h-10 rounded-full"
            width={40}
            height={40}
            alt=""
          />
        </Link>
        <div className="space-y-1 font-medium dark:text-white">
          <Link
            href={`/user/${review.review_user}`}
            className="hover:underline"
          >
            <span>{review.review_user}</span>
          </Link>
          <time
            className="block text-sm text-gray-500 dark:text-gray-400"
            dateTime="2017-03-03 19:00"
          >
            Reviewed at {created.toLocaleString()}
          </time>
        </div>
      </div>
      <p className="mb-2 text-gray-500 dark:text-gray-400">{review.message}</p>
    </div>
  );
}
