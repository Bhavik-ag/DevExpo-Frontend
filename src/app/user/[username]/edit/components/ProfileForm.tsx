"use client";

import { useEffect, useState } from "react";
import Spinner from "@/app/components/Spinner";
import getProfile from "@/lib/getProfile";
import { useParams } from "next/navigation";
import { ProfileType } from "../../page";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUpdateUserMutation } from "@/store/features/authApiSlice";

export type Profile = {
  first_name: string;
  last_name: string;
  profile: {
    bio: string;
    profile_pic: string;
    github: string;
    linkedin: string;
    twitter: string;
    website: string;
  };
};

const initialProfile: Profile = {
  first_name: "",
  last_name: "",
  profile: {
    bio: "",
    profile_pic: "",
    github: "",
    linkedin: "",
    twitter: "",
    website: "",
  },
};

export default function ProfileForm() {
  const [userData, setUserData] = useState<Profile>(initialProfile);
  const { username } = useParams();

  useEffect(() => {
    const getUserData = async () => {
      const data: ProfileType = await getProfile(username);
      if (data) {
        const { projects, ...rest } = data;
        setUserData(rest);
      }
    };
    getUserData();
  }, []);

  const [profilePic, setProfilePic] = useState<File | null>(null);

  const { first_name, last_name, profile } = userData;

  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const router = useRouter();

  const handleProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfilePic(e.target.files ? e.target.files[0] : null);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("first_name", userData.first_name);
    formData.append("last_name", userData.last_name);

    if (profilePic) {
      formData.append("profile_pic", profilePic);
    }

    formData.append("bio", profile.bio);
    formData.append("github", profile.github);
    formData.append("linkedin", profile.linkedin);
    formData.append("twitter", profile.twitter);
    formData.append("website", profile.website);

    updateUser({ userData: formData, username: username })
      .unwrap()
      .then((res) => {
        router.push(`/user/${username}`);
        toast.success("Profile updated successfully");
        console.log(res);
      })
      .catch((err) => {
        toast.error("Unable to update profile");
      });
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Edit your profile
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {/* Profile Pic */}
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Profile Image *
              </label>
              <label
                htmlFor="profile-pic"
                className="flex flex-col items-center justify-center w-[160px] h-[160px] border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                {profilePic ? (
                  <div className="flex flex-col items-center justify-center py-2">
                    <Image
                      src={URL.createObjectURL(profilePic)}
                      alt="profile-pic"
                      width={150}
                      height={150}
                      className="object-cover w-40 h-40 rounded-full shadow-lg lg:w-50 lg:h-50"
                    />
                  </div>
                ) : (
                  <Image
                    src={profile.profile_pic}
                    alt="profile-pic"
                    width={150}
                    height={150}
                    className="object-cover w-40 h-40 rounded-full shadow-lg lg:w-50 lg:h-50"
                  />
                )}
                <input
                  id="profile-pic"
                  type="file"
                  name="profile-pic"
                  accept="image/png, image/jpeg, image/jpg"
                  className="hidden"
                  onChange={handleProfileImage}
                />
              </label>
            </div>
            {/* First Name */}
            <div className="w-full">
              <label
                htmlFor="firstname"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                value={first_name}
                onChange={(e) =>
                  setUserData({ ...userData, first_name: e.target.value })
                }
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="First Name"
              />
            </div>
            {/* Last Name */}
            <div className="w-full">
              <label
                htmlFor="lastname"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                value={last_name}
                onChange={(e) =>
                  setUserData({ ...userData, last_name: e.target.value })
                }
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Last Name"
              />
            </div>
            {/* Bio */}
            <div className="sm:col-span-2">
              <label
                htmlFor="bio"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Bio
              </label>
              <textarea
                id="bio"
                rows={2}
                maxLength={250}
                value={profile.bio}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    profile: { ...profile, bio: e.target.value },
                  })
                }
                className="block outline-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write a short bio about yourself"
              ></textarea>
            </div>

            {/* Github */}
            <div className="w-full">
              <label
                htmlFor="github"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Github
              </label>
              <input
                type="url"
                name="github"
                id="github"
                value={profile.github}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    profile: { ...profile, github: e.target.value },
                  })
                }
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Github Profile Link"
              />
            </div>
            {/* Twitter */}
            <div className="w-full">
              <label
                htmlFor="twitter"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Twitter
              </label>
              <input
                type="url"
                name="twitter"
                id="twitter"
                value={profile.twitter}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    profile: { ...profile, twitter: e.target.value },
                  })
                }
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Twitter Profile Link"
              />
            </div>
            {/* Linkedin */}
            <div className="w-full">
              <label
                htmlFor="linkedin"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Linkedin
              </label>
              <input
                type="url"
                name="linkedin"
                id="linkedin"
                value={profile.linkedin}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    profile: { ...profile, linkedin: e.target.value },
                  })
                }
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Linkedin Profile Link"
              />
            </div>
            {/* Website */}
            <div className="w-full">
              <label
                htmlFor="website"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Website URL
              </label>
              <input
                type="url"
                name="website"
                id="website"
                value={profile.website}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    profile: { ...profile, website: e.target.value },
                  })
                }
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your Website Link"
              />
            </div>
          </div>
          {/* Submit Button */}
          <div className="flex w-full justify-center">
            <button
              type="submit"
              className="flex justify-center w-full max-w-lg items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              {isLoading ? <Spinner /> : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
