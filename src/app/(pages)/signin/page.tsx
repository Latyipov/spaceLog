"use client";
import { Suspense, useState } from "react";
import { SignInForm } from "@components/SignInForm";
import { SignUpForm } from "@components/SignUpForm";
import { Loading } from "@components/Loading/Loading";

export default function SignInPage() {
  const [form, setForm] = useState<"signin" | "signup">("signin");

  return (
    <main className=" mx-auto w-full md:w-[80%] flex-1 flex flex-col justify-center items-center">
      <Suspense fallback={<Loading />}>
        {form === "signin" && <SignInForm setForm={setForm} />}
        {form === "signup" && <SignUpForm setForm={setForm} />}
      </Suspense>
    </main>
  );
}
