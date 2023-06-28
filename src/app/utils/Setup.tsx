"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import {
  setCredentials,
  finishLoading,
  setUser,
} from "@/store/features/authSlice";
import { useVerifyMutation } from "@/store/features/authApiSlice";
import { Toaster } from "react-hot-toast";

export default function Setup() {
  const dispatch = useAppDispatch();
  const [verify] = useVerifyMutation();

  useEffect(() => {
    verify(undefined)
      .unwrap()
      .then((data) => {
        dispatch(setCredentials());
        dispatch(
          setUser({
            user: data.username,
            name: data.name,
            profile_pic: data.profile_image,
          })
        );
      })
      .finally(() => {
        dispatch(finishLoading());
      });
  }, []);

  return <Toaster />;
}
