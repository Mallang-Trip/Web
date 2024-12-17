import { memo } from "react";
import { Outlet } from "react-router-dom";
import { Header, BottomNav, Footer } from "@/components";

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <BottomNav />
      <Footer />
    </>
  );
}

export default memo(MainLayout);
