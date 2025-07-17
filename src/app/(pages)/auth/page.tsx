"use client";
import { useState } from "react";
import { SignInForm } from "@components/SignInForm";
import { SignUpForm } from "@components/SignUpForm";

export default function AuthInPage() {
  const [form, setForm] = useState<"signin" | "signup">("signin");

  return (
    <main className=" mx-auto w-full md:w-[80%] flex-1 flex flex-col justify-center items-center">
      {form === "signin" && <SignInForm setForm={setForm} />}
      {form === "signup" && <SignUpForm setForm={setForm} />}
    </main>
  );
}
