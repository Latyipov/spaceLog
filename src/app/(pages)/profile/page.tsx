"use client";

import { ProfileForm } from "@components/ProfileForm";

export default function ProfilePage() {
  return (
    <main className=" mx-auto w-full md:w-[80%] flex-1 flex flex-col justify-center items-center">
      <ProfileForm />
    </main>
  );
}

// const handleUpdateEmail = () => {
//   // TODO: API call
//   setMessage("Email updated");
// };

// const handleUpdatePassword = () => {
//   // TODO: API call
//   setMessage("Password updated");
// };

// const handleDeleteAccount = () => {
//   const confirmed = confirm("Are you sure you want to delete your account?");
//   if (confirmed) {
//     // TODO: API call
//     setMessage("Account deleted (simulated)");
//   }
// };
