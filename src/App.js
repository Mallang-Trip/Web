import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Header from "./components/Layout/Header";
import BottomNav from "./components/Layout/BottomNav";
import PlaceResultPage from "./pages/PlaceResultPage";
import PartyResult from "./pages/PartyResult";

function App() {
  return (
    <div className="max-w-screen-lg mx-auto">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/result/:place" element={<PlaceResultPage />} />
        <Route path="/party/:place" element={<PartyResult />} />
      </Routes>
      <BottomNav />
    </div>
  );
}

export default App;
