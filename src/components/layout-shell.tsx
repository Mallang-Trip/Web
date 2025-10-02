"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CustomerService from "@/components/customer-service";
import { Toaster } from "@/components/ui/sonner";

type LayoutShellProps = {
  children: ReactNode;
};

export default function LayoutShell({ children }: LayoutShellProps) {
  const pathname = usePathname();
  const hideChrome = pathname === "/payple/return";

  if (hideChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Toaster />
      <CustomerService />
      <Footer />
    </>
  );
}
