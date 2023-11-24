import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Auth from "./hoc/Auth";
import LandingPage from "./pages/LandingPage";
import IntroPage from "./pages/IntroPage";
import LoginPage from "./pages/LoginPage";
import LoginSearchPage from "./pages/LoginSearchPage";
import PartyPage from "./pages/PartyPage";
import SignupPage from "./pages/SignupPage";
import CourseSuggestPage from "./pages/CourseSuggestPage";
import MyProfilePage from "./pages/MyProfilePage";
import MyHeartPage from "./pages/MyHeartPage";
import ReservationPage from "./pages/ReservationPage";
import PartyApprovalPage from "./pages/PartyApprovalPage";
import NewPartyPage from "./pages/NewPartyPage";
import PartyHistoryPage from "./pages/PartyHistoryPage";
import DriverProfilePage from "./pages/DriverProfilePage";
import SearchPlacePage from "./pages/SearchPlacePage";
import DestinationPage from "./pages/DestinationPage";
import DriverApplyPage from "./pages/DriverApplyPage";
import EditCoursePage from "./pages/EditCoursePage";

function App() {
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthIntroPage = Auth(IntroPage, null);
  const AuthPartyPage = Auth(PartyPage, null);
  const AuthCourseSuggestPage = Auth(CourseSuggestPage, true);
  const AuthReservationPage = Auth(ReservationPage, true);
  const AuthPartyApprovalPage = Auth(PartyApprovalPage, true);
  const AuthNewPartyPage = Auth(NewPartyPage, true);
  const AuthPartyHistoryPage = Auth(PartyHistoryPage, true);
  const AuthDriverProfilePage = Auth(DriverProfilePage, null);
  const AuthMyProfilePage = Auth(MyProfilePage, true);
  const AuthMyHeartPage = Auth(MyHeartPage, true);
  const AuthDriverApplyPage = Auth(DriverApplyPage, true);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthLoginSearchPage = Auth(LoginSearchPage, false);
  const AuthSignupPage = Auth(SignupPage, false);
  const AuthSearchPlacePage = Auth(SearchPlacePage, null);
  const AuthDestinationPage = Auth(DestinationPage, null);

  return (
    <div>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<AuthLandingPage />} />
          <Route path="/intro" element={<AuthIntroPage />} />
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
          <Route path="/party/history" element={<AuthPartyHistoryPage />} />
          <Route
            path="/driver/profile/:driverId"
            element={<AuthDriverProfilePage />}
          />
          <Route path="/my/profile" element={<AuthMyProfilePage />} />
          <Route path="/my/heart" element={<AuthMyHeartPage />} />
          <Route path="/driver/apply" element={<AuthDriverApplyPage />} />
          <Route
            path="/search/place/:keyword"
            element={<AuthSearchPlacePage />}
          />
          <Route
            path="/destination/detail/:destinationId"
            element={<AuthDestinationPage />}
          />

          <Route path="/course/edit/:courseId" element={<EditCoursePage />} />
        </Route>

        <Route path="/login" element={<AuthLoginPage />} />
        <Route path="/login/search/:target" element={<AuthLoginSearchPage />} />
        <Route path="/signup" element={<AuthSignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
