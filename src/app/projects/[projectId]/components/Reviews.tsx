"use client";
import Review from "./Review";
import { ReviewType } from "../page";
import { FormEvent, useState } from "react";
import { useCreateReviewMutation } from "@/store/features/projectApiSlice";
import { useRouter } from "next/navigation";

export default function Reviews({
  reviews,
  projectId,
}: {
  reviews: ReviewType[];
  projectId: number;
}) {
  const [review, setReview] = useState("");
  const [reviewData, setReviewData] = useState<ReviewType[]>(reviews);

  const [createReview, { isLoading }] = useCreateReviewMutation();
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      message: review,
      projectId: projectId,
    };
    createReview(data)
      .unwrap()
      .then((data) => {
        setReviewData(data);
        setReview("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section>
      <div className="my-7 pb-7">
        <h5 className="text-heading text-lg font-semibold mb-4">Reviews</h5>
        <div className="col-span-1 pt-8 lg:pt-0">
          <form className="mb-6" onSubmit={handleSubmit}>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label htmlFor="review" className="sr-only">
                Your Review
              </label>
              <textarea
                id="review"
                rows={3}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="p-2 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a review..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Post review
            </button>
          </form>
          <div className="flex flex-col">
            {reviewData.map((review) => (
              <Review review={review} key={review.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
