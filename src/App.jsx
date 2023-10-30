import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Auth from "./hoc/Auth";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import LoginSearchPage from "./pages/LoginSearchPage";
import PartyPage from "./pages/PartyPage";
import SignupPage from "./pages/SignupPage";
import CourseSuggestPage from "./pages/CourseSuggestPage";
import MyProfilePage from "./pages/MyProfilePage";
import SearchLayout from "./components/SearchLayout";
import ReservationPage from "./pages/ReservationPage";
import PartyApprovalPage from "./pages/PartyApprovalPage";
import NewPartyPage from "./pages/NewPartyPage";
import DriverProfilePage from "./pages/DriverProfilePage";
import SearchPlacePage from "./pages/SearchPlacePage";

function App() {
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthPlaceMap = Auth(SearchPlacePage, null);
  const AuthMyProfilePage = Auth(MyProfilePage, true);
  const AuthDriverProfilePage = Auth(DriverProfilePage, null);

  return (
    <div className="max-w-screen-xl mx-auto">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<AuthLandingPage />} />
          <Route path="/party/:partyId" element={<PartyPage />} />
          <Route
            path="/party/course/suggest/:partyId"
            element={<CourseSuggestPage />}
          />
          <Route
            path="/party/reservation/:partyId"
            element={<ReservationPage />}
          />
          <Route
            path="/party/approval/:type/:partyId"
            element={<PartyApprovalPage />}
          />
          <Route path="/party/new/:step" element={<NewPartyPage />} />
          <Route
            path="/driver/profile/:driverId"
            element={<AuthDriverProfilePage />}
          />
          <Route path="/my/profile" element={<AuthMyProfilePage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/search/:target" element={<LoginSearchPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<SearchLayout />}>
          <Route path="/search" element={<AuthPlaceMap />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
