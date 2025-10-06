"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

interface NewAgreeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  agreeAll: boolean;
  agreeService: boolean;
  agreeTravel: boolean;
  agreePrivacy: boolean;
  agreeThirdparty: boolean;
  onAgreeAllChange: (checked: boolean) => void;
  onIndividualAgreeChange: (field: string, checked: boolean) => void;
  onConfirm: () => void;
}

export default function NewAgreeDialog({
  isOpen,
  onOpenChange,
  agreeAll,
  agreeService,
  agreeTravel,
  agreePrivacy,
  agreeThirdparty,
  onAgreeAllChange,
  onIndividualAgreeChange,
  onConfirm,
}: NewAgreeDialogProps) {
  const allChecked =
    agreeService && agreeTravel && agreePrivacy && agreeThirdparty;

  const agreeItems = [
    {
      id: "loginAgreeService",
      field: "agreeService",
      checked: agreeService,
      label: "말랑트립 투어 서비스 이용약관",
      href: "/policy/service",
    },
    {
      id: "loginAgreeTravel",
      field: "agreeTravel",
      checked: agreeTravel,
      label: "말랑트립 투어 국내여행 표준약관",
      href: "/policy/travel",
    },
    {
      id: "loginAgreePrivacy",
      field: "agreePrivacy",
      checked: agreePrivacy,
      label: "개인정보 수집·이용 동의",
      href: "/policy/privacy",
    },
    {
      id: "loginAgreeThirdparty",
      field: "agreeThirdparty",
      checked: agreeThirdparty,
      label: "개인정보 제3자 제공 동의",
      href: "/policy/thirdparty",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="border-none bg-white">
        <DialogHeader>
          <DialogTitle>약관 동의</DialogTitle>
          <DialogDescription>
            서비스 이용을 위해 아래 필수 약관에 동의해 주세요.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2 space-y-3">
          <div className="mb-3 flex items-center space-x-2">
            <input
              type="checkbox"
              id="loginAgreeAll"
              checked={agreeAll}
              onChange={(e) => onAgreeAllChange(e.target.checked)}
              className="h-5 w-5 accent-blue-600"
            />
            <label
              htmlFor="loginAgreeAll"
              className="cursor-pointer text-base font-semibold"
            >
              아래 약관에 모두 동의합니다.
            </label>
          </div>

          <hr className="my-2 border-t border-gray-200" />

          <div className="space-y-3">
            {agreeItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={item.id}
                  checked={item.checked}
                  onChange={(e) =>
                    onIndividualAgreeChange(item.field, e.target.checked)
                  }
                  className="h-4 w-4 accent-blue-600"
                  required
                />
                <label
                  htmlFor={item.id}
                  className="flex cursor-pointer items-center gap-1 text-sm"
                >
                  <span className="text-red-500">[필수]</span>
                  <Link
                    href={item.href}
                    target="_blank"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    {item.label}
                  </Link>
                </label>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full" onClick={onConfirm} disabled={!allChecked}>
            동의하고 계속하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
