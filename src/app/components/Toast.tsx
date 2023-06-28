"use client";
import { toast } from "react-hot-toast";

export default function Toast({
  message,
  type,
}: {
  message: string;
  type: string;
}) {
  if (type === "error") toast.error(message);
  else if (type === "success") toast.success(message);
  return <></>;
}
