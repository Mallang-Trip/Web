import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import LoginSearchPage from "./pages/LoginSearchPage";
import PlaceResultPage from "./pages/PlaceResultPage";
import PartyResult from "./pages/PartyResult";

function App() {
  return (
    <div className="max-w-screen-lg mx-auto">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/result/:place" element={<PlaceResultPage />} />
          <Route path="/party/:place" element={<PartyResult />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/search/:target" element={<LoginSearchPage />} />
      </Routes>
    </div>
  );
}

export default App;
