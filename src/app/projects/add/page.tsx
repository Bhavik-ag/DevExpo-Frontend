"use client";
import ProjectForm from "./components/ProjectForm";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function AddProject() {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  const router = useRouter();

  if (!isLoading && !isAuthenticated) {
    toast.error("You need to login first");
    router.push("/user/login");
  }

  return <ProjectForm />;
}
