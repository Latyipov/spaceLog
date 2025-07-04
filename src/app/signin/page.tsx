import { Suspense } from "react";
import { SignIn } from "@components/SignIn";
export default function LoginPage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <SignIn />
    </Suspense>
  );
}
