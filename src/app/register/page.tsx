import { Suspense } from "react";
import { RegisterForm } from "./_component/register-form";

export default function RegisterPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-gray-50 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Suspense fallback={<div>로딩 중...</div>}>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
}
