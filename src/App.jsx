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
  const AuthPartyPage = Auth(PartyPage, null);
  const AuthCourseSuggestPage = Auth(CourseSuggestPage, true);
  const AuthReservationPage = Auth(ReservationPage, true);
  const AuthPartyApprovalPage = Auth(PartyApprovalPage, true);
  const AuthNewPartyPage = Auth(NewPartyPage, true);
  const AuthDriverProfilePage = Auth(DriverProfilePage, null);
  const AuthMyProfilePage = Auth(MyProfilePage, true);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthLoginSearchPage = Auth(LoginSearchPage, false);
  const AuthSignupPage = Auth(SignupPage, false);
  const AuthPlaceMap = Auth(SearchPlacePage, null);

  return (
    <div className="max-w-screen-xl mx-auto">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<AuthLandingPage />} />
          <Route path="/party/:partyId" element={<AuthPartyPage />} />
          <Route
            path="/party/course/suggest/:partyId"
            element={<AuthCourseSuggestPage />}
          />
          <Route
            path="/party/reservation/:partyId"
            element={<AuthReservationPage />}
          />
          <Route
            path="/party/approval/:type/:partyId"
            element={<AuthPartyApprovalPage />}
          />
          <Route path="/party/new/:step" element={<AuthNewPartyPage />} />
          <Route
            path="/driver/profile/:driverId"
            element={<AuthDriverProfilePage />}
          />
          <Route path="/my/profile" element={<AuthMyProfilePage />} />
        </Route>

        <Route path="/login" element={<AuthLoginPage />} />
        <Route path="/login/search/:target" element={<AuthLoginSearchPage />} />
        <Route path="/signup" element={<AuthSignupPage />} />
        <Route element={<SearchLayout />}>
          <Route path="/search" element={<AuthPlaceMap />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
