import Spinner from "@/app/components/Spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
        <Spinner />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
