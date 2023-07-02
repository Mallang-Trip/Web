import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Header from "./components/Layout/Header";
import BottomNav from "./components/Layout/BottomNav";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
      <BottomNav />
    </React.Fragment>
  );
}

export default App;
