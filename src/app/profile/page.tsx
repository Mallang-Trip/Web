"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useTranslation } from "@/hooks/use-translation";
import { AuthAPI } from "@/utils/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Loading from "@/components/loading";

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated, hasHydrated, phoneNumber, logout } = useAuth();
  const { t } = useTranslation();
  const tProfile = t.my.profile;

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      const returnUrl = "/my/profile";
      router.replace(`/login?returnUrl=${encodeURIComponent(returnUrl)}`);
    }
  }, [hasHydrated, isAuthenticated, router]);

  const handleCancel = () => {
    router.back();
  };

  const handleWithdraw = async () => {
    try {
      setIsLoading(true);
      setShowConfirmDialog(false);

      await AuthAPI.withdrawal();

      toast.success(tProfile.toast.success);

      logout();
      router.replace("/");
    } catch (error) {
      console.error("회원탈퇴 실패:", error);
      toast.error(tProfile.toast.error, {
        description: tProfile.toast.tryAgain,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!hasHydrated || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loading />
      </div>
    );
  }

  return (
    <main className="mt-16 min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-6 py-8">
        <Card className="border-none bg-gray-50 shadow-lg">
          <CardHeader className="border-b border-gray-200 bg-gray-50 pb-4">
            <CardTitle className="text-xl font-bold text-gray-900">
              {tProfile.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
            <div className="rounded-lg bg-gray-100 p-4">
              <p className="text-sm text-gray-500">{tProfile.phoneNumber}</p>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {phoneNumber || "-"}
              </p>
            </div>

            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <h3 className="mb-3 font-semibold text-amber-800">
                {tProfile.notice.title}
              </h3>
              <ul className="space-y-2">
                {tProfile.notice.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-amber-700"
                  >
                    <span className="mt-0.5 text-amber-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleCancel}
                disabled={isLoading}
              >
                {tProfile.buttons.cancel}
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => setShowConfirmDialog(true)}
                disabled={isLoading}
              >
                {isLoading ? tProfile.loading : tProfile.buttons.withdraw}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="border-none">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <WarningIcon />
              {tProfile.dialog.title}
            </AlertDialogTitle>
            <AlertDialogDescription className="pt-2">
              {tProfile.dialog.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex w-full flex-shrink-0 gap-2">
            <AlertDialogCancel className="flex-1">
              {tProfile.dialog.cancel}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleWithdraw}
              className="flex-1 bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
            >
              {tProfile.dialog.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}

function WarningIcon() {
  return (
    <svg
      className="h-5 w-5 text-red-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
      />
    </svg>
  );
}
