import { Suspense } from "react";
import { LoginForm } from "./_component/login-form";
import Loading from "@/components/loading";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-gray-50 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
              <Loading text="로딩 중..." />
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
