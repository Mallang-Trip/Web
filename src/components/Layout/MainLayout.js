import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <BottomNav />
    </>
  );
}

export default MainLayout;
