import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Auth from "./hoc/Auth";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import LoginSearchPage from "./pages/LoginSearchPage";
import PlaceResultPage from "./pages/PlaceResultPage";
import PartyResult from "./pages/PartyResult";
import SignupPage from "./pages/SignupPage";
import H003Edt from "./pages/H003Edt";
import MyProfilePage from "./pages/MyProfilePage";

function App() {
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthPlaceResultPage = Auth(PlaceResultPage, true);

  return (
    <div className="max-w-screen-xl mx-auto">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<AuthLandingPage />} />
          <Route path="/result/:place" element={<AuthPlaceResultPage />} />
          <Route path="/party/:place" element={<PartyResult />} />
          <Route path="/party/H003Edt/:place" element={<H003Edt />} />
          <Route path="/my/profile" element={<MyProfilePage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/search/:target" element={<LoginSearchPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
