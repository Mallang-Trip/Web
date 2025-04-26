import { memo } from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "@/hoc/Auth";
import { MainLayout } from "@/components";
import {
  AdminPage,
  CommunityPage,
  CommunityPostPage,
  CommunitySearchPage,
  DestinationPage,
  DriverApplyPage,
  DriverCoursePage,
  DriverIncomePage,
  DriverProfilePage,
  HelpPage,
  IntroPage,
  LandingPage,
  LoginPage,
  LoginSearchPage,
  MyArticlePage,
  MyHeartPage,
  MyMenuPage,
  MyPaymentListPage,
  MyPaymentPage,
  MyProfilePage,
  MyReservationPage,
  NewPartyPage,
  NotFoundPage,
  NotifyPage,
  PartyHistoryPage,
  PartyPage,
  PolicyPage,
  SearchPlacePage,
  SignupPage,
  TalkPage,
  CourseDetailPage,
} from "@/pages";

function Router() {
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthIntroPage = Auth(IntroPage, null);
  const AuthPolicyPage = Auth(PolicyPage, null);
  const AuthPartyPage = Auth(PartyPage, null);
  const AuthNewPartyPage = Auth(NewPartyPage, true);
  const AuthCourseDetailPage = Auth(CourseDetailPage, null);
  const AuthPartyHistoryPage = Auth(PartyHistoryPage, true);
  const AuthDriverProfilePage = Auth(DriverProfilePage, null);
  const AuthMyMenuPage = Auth(MyMenuPage, true);
  const AuthMyProfilePage = Auth(MyProfilePage, true);
  const AuthMyHeartPage = Auth(MyHeartPage, true);
  const AuthMyArticlePage = Auth(MyArticlePage, true);
  const AuthMyReservationPage = Auth(MyReservationPage, true);
  const AuthMyPaymentPage = Auth(MyPaymentPage, true);
  const AuthMyPaymentListPage = Auth(MyPaymentListPage, true);
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
        <Route path="/my/payment/list" element={<AuthMyPaymentListPage />} />
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
        <Route
          path="/course/detail/:courseId/:driverId"
          element={<AuthCourseDetailPage />}
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
        <Route path="/login" element={<AuthLoginPage />} />
        <Route path="/login/search/:target" element={<AuthLoginSearchPage />} />
        <Route path="/signup" element={<AuthSignupPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default memo(Router);
