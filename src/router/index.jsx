import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Auth from "../hoc/Auth";
import LandingPage from "../pages/LandingPage";
import IntroPage from "../pages/IntroPage";
import PolicyPage from "../pages/PolicyPage";
import LoginPage from "../pages/LoginPage";
import LoginSearchPage from "../pages/LoginSearchPage";
import PartyPage from "../pages/PartyPage";
import SignupPage from "../pages/SignupPage";
import CourseSuggestPage from "../pages/CourseSuggestPage";
import MyMenuPage from "../pages/MyMenuPage";
import MyProfilePage from "../pages/MyProfilePage";
import MyHeartPage from "../pages/MyHeartPage";
import MyArticlePage from "../pages/MyArticlePage";
import ReservationPage from "../pages/ReservationPage";
import PartyApprovalPage from "../pages/PartyApprovalPage";
import NewPartyPage from "../pages/NewPartyPage";
import PartyHistoryPage from "../pages/PartyHistoryPage";
import DriverProfilePage from "../pages/DriverProfilePage";
import SearchPlacePage from "../pages/SearchPlacePage";
import DestinationPage from "../pages/DestinationPage";
import DriverApplyPage from "../pages/DriverApplyPage";
import EditCoursePage from "../pages/EditCoursePage";
import CommunityPage from "../pages/CommunityPage";
import CommunityPostPage from "../pages/CommunityPostPage";
import CommunitySearchPage from "../pages/CommunitySearchPage";
import TalkPage from "../pages/TalkPage";
import NotifyPage from "../pages/NotifyPage";
import HelpPage from "../pages/HelpPage";
import AdminPage from "../pages/AdminPage";

function Router() {
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthIntroPage = Auth(IntroPage, null);
  const AuthPolicyPage = Auth(PolicyPage, null);
  const AuthPartyPage = Auth(PartyPage, null);
  const AuthCourseSuggestPage = Auth(CourseSuggestPage, true);
  const AuthReservationPage = Auth(ReservationPage, true);
  const AuthPartyApprovalPage = Auth(PartyApprovalPage, true);
  const AuthNewPartyPage = Auth(NewPartyPage, true);
  const AuthPartyHistoryPage = Auth(PartyHistoryPage, true);
  const AuthDriverProfilePage = Auth(DriverProfilePage, null);
  const AuthMyMenuPage = Auth(MyMenuPage, true);
  const AuthMyProfilePage = Auth(MyProfilePage, true);
  const AuthMyHeartPage = Auth(MyHeartPage, true);
  const AuthMyArticlePage = Auth(MyArticlePage, true);
  const AuthDriverApplyPage = Auth(DriverApplyPage, true);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthLoginSearchPage = Auth(LoginSearchPage, false);
  const AuthSignupPage = Auth(SignupPage, false);
  const AuthSearchPlacePage = Auth(SearchPlacePage, null);
  const AuthDestinationPage = Auth(DestinationPage, null);
  const AuthCommunityPage = Auth(CommunityPage, null);
  const AuthCommunityPostPage = Auth(CommunityPostPage, true);
  const AuthCommunitySearchPage = Auth(CommunitySearchPage, null);
  const AuthTalkPage = Auth(TalkPage, true);
  const AuthNotifyPage = Auth(NotifyPage, true);
  const AuthHelpPage = Auth(HelpPage, null);
  const AuthAdminPage = Auth(AdminPage, true, true);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<AuthLandingPage />} />
        <Route path="/intro" element={<AuthIntroPage />} />
        <Route path="/policy/:category/:type" element={<AuthPolicyPage />} />
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
        <Route path="/my/menu" element={<AuthMyMenuPage />} />
        <Route path="/my/profile" element={<AuthMyProfilePage />} />
        <Route path="/my/heart" element={<AuthMyHeartPage />} />
        <Route path="/my/article" element={<AuthMyArticlePage />} />
        <Route path="/my/party/history" element={<AuthPartyHistoryPage />} />
        <Route path="/my/driver/apply" element={<AuthDriverApplyPage />} />
        <Route
          path="/search/place/:keyword"
          element={<AuthSearchPlacePage />}
        />
        <Route
          path="/destination/detail/:destinationId"
          element={<AuthDestinationPage />}
        />
        <Route path="/course/edit/:courseId" element={<EditCoursePage />} />
        <Route path="/community/:articleId" element={<AuthCommunityPage />} />
        <Route
          path="/community/post/:articleId"
          element={<AuthCommunityPostPage />}
        />
        <Route
          path="/community/search/:keyword"
          element={<AuthCommunitySearchPage />}
        />
        <Route path="/talk" element={<AuthTalkPage />} />
        <Route path="/notify" element={<AuthNotifyPage />} />
        <Route path="/help/:id" element={<AuthHelpPage />} />
        <Route path="/admin" element={<AuthAdminPage />} />
      </Route>

      <Route path="/login" element={<AuthLoginPage />} />
      <Route path="/login/search/:target" element={<AuthLoginSearchPage />} />
      <Route path="/signup" element={<AuthSignupPage />} />
    </Routes>
  );
}

export default Router;