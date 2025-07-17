"use client";

import { ProfileForm } from "@components/ProfileForm";

export default function ProfilePage() {
  return (
    <main className=" mx-auto w-full md:w-[80%] flex-1 flex flex-col justify-center items-center">
      <ProfileForm />
    </main>
  );
}
