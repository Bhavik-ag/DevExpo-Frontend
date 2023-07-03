"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import ProfileForm from "./components/ProfileForm";

export default function ProfileEdit() {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast.error("You need to login first");
      router.push("/user/login");
    }
  }, [isAuthenticated, isLoading]);

  return <ProfileForm />;
}
