import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import BottomNav from "../BottomNav";

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
