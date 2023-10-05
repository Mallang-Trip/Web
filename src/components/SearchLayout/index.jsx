import React from "react";
import { Outlet } from "react-router-dom";
import SearchHeader from "../SearchHeader";
import BottomNav from "../BottomNav";

function MainLayout() {
  return (
    <>
      <SearchHeader />
      <Outlet />
      <BottomNav />
    </>
  );
}

export default MainLayout;
