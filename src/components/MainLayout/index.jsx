import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import BottomNav from "../BottomNav";
import Footer from "../Footer";

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

export default MainLayout;
