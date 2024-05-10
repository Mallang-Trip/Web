import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import LoginLayout from "../components/LoginLayout";
import Auth from "../hoc/Auth";
import LandingPage from "../pages/LandingPage";
import IntroPage from "../pages/IntroPage";
import PolicyPage from "../pages/PolicyPage";
import LoginPage from "../pages/LoginPage";
import LoginSearchPage from "../pages/LoginSearchPage";
import PartyPage from "../pages/PartyPage";
import SignupPage from "../pages/SignupPage";
import MyMenuPage from "../pages/MyMenuPage";
import MyProfilePage from "../pages/MyProfilePage";
import MyHeartPage from "../pages/MyHeartPage";
import MyArticlePage from "../pages/MyArticlePage";
import MyReservationPage from "../pages/MyReservationPage";
import MyPaymentPage from "../pages/MyPaymentPage";
import NewPartyPage from "../pages/NewPartyPage";
import PartyHistoryPage from "../pages/PartyHistoryPage";
import DriverProfilePage from "../pages/DriverProfilePage";
import SearchPlacePage from "../pages/SearchPlacePage";
import DestinationPage from "../pages/DestinationPage";
import DriverApplyPage from "../pages/DriverApplyPage";
import DriverCoursePage from "../pages/DriverCoursePage";
import DriverIncomePage from "../pages/DriverIncomePage";
import CommunityPage from "../pages/CommunityPage";
import CommunityPostPage from "../pages/CommunityPostPage";
import CommunitySearchPage from "../pages/CommunitySearchPage";
import TalkPage from "../pages/TalkPage";
import NotifyPage from "../pages/NotifyPage";
import HelpPage from "../pages/HelpPage";
import AdminPage from "../pages/AdminPage";
import NotFoundPage from "../pages/NotFoundPage";

function Router() {
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthIntroPage = Auth(IntroPage, null);
  const AuthPolicyPage = Auth(PolicyPage, null);
  const AuthPartyPage = Auth(PartyPage, null);
  const AuthNewPartyPage = Auth(NewPartyPage, true);
  const AuthPartyHistoryPage = Auth(PartyHistoryPage, true);
  const AuthDriverProfilePage = Auth(DriverProfilePage, null);
  const AuthMyMenuPage = Auth(MyMenuPage, true);
  const AuthMyProfilePage = Auth(MyProfilePage, true);
  const AuthMyHeartPage = Auth(MyHeartPage, true);
  const AuthMyArticlePage = Auth(MyArticlePage, true);
  const AuthMyReservationPage = Auth(MyReservationPage, true);
  const AuthMyPaymentPage = Auth(MyPaymentPage, true);
  const AuthDriverApplyPage = Auth(DriverApplyPage, true);
  const AuthDriverCoursePage = Auth(DriverCoursePage, true);
  const AuthDriverIncomePage = Auth(DriverIncomePage, true);
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
        <Route path="/party/:type/:partyId" element={<AuthPartyPage />} />
        <Route path="/party/new/:step" element={<AuthNewPartyPage />} />
        <Route
          path="/driver/profile/:driverId"
          element={<AuthDriverProfilePage />}
        />
        <Route path="/my/menu" element={<AuthMyMenuPage />} />
        <Route path="/my/profile" element={<AuthMyProfilePage />} />
        <Route path="/my/heart" element={<AuthMyHeartPage />} />
        <Route path="/my/article" element={<AuthMyArticlePage />} />
        <Route path="/my/reservation" element={<AuthMyReservationPage />} />
        <Route path="/my/payment" element={<AuthMyPaymentPage />} />
        <Route path="/my/party/history" element={<AuthPartyHistoryPage />} />
        <Route path="/my/driver/apply" element={<AuthDriverApplyPage />} />
        <Route
          path="/my/driver/course/:courseId"
          element={<AuthDriverCoursePage />}
        />
        <Route path="/my/driver/income" element={<AuthDriverIncomePage />} />
        <Route
          path="/search/place/:keyword"
          element={<AuthSearchPlacePage />}
        />
        <Route
          path="/destination/detail/:destinationId"
          element={<AuthDestinationPage />}
        />
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
        <Route path="/admin/:type" element={<AuthAdminPage />} />
      </Route>

      <Route element={<LoginLayout />}>
        <Route path="/login" element={<AuthLoginPage />} />
        <Route path="/login/search/:target" element={<AuthLoginSearchPage />} />
        <Route path="/signup" element={<AuthSignupPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;
