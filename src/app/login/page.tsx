"use client";

import { Suspense } from "react";
import { LoginForm } from "./_component/login-form";
import Loading from "@/components/loading";
import { useTranslation } from "@/hooks/use-translation";

function LoginPageContent() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-gray-50 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
              <Loading text={t.login.page.loadingText} />
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return <LoginPageContent />;
}
