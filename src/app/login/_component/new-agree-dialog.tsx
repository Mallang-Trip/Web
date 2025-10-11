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
import { useTranslation } from "@/hooks/use-translation";

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
  const { t } = useTranslation();
  const allChecked =
    agreeService && agreeTravel && agreePrivacy && agreeThirdparty;

  const agreeItems = [
    {
      id: "loginAgreeService",
      field: "agreeService",
      checked: agreeService,
      label: t.login.termsDialog.terms.service,
      href: "/policy/service",
    },
    {
      id: "loginAgreeTravel",
      field: "agreeTravel",
      checked: agreeTravel,
      label: t.login.termsDialog.terms.travel,
      href: "/policy/travel",
    },
    {
      id: "loginAgreePrivacy",
      field: "agreePrivacy",
      checked: agreePrivacy,
      label: t.login.termsDialog.terms.privacy,
      href: "/policy/privacy",
    },
    {
      id: "loginAgreeThirdparty",
      field: "agreeThirdparty",
      checked: agreeThirdparty,
      label: t.login.termsDialog.terms.thirdparty,
      href: "/policy/thirdparty",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="border-none bg-white">
        <DialogHeader>
          <DialogTitle>{t.login.termsDialog.title}</DialogTitle>
          <DialogDescription>
            {t.login.termsDialog.description}
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
              {t.login.termsDialog.agreeAll}
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
                  <span className="text-red-500">
                    {t.login.termsDialog.required}
                  </span>
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
            {t.login.termsDialog.confirmButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
