import PageContainer from "../../components/PageContainer";
import AdminSideBar from "./AdminSidebar";
import AdminHome from "./AdminHome";
import KPI from "./KPI";
import Profit from "./Profit";
import Payment from "./Payment";
import Service from "./CustomerService/Service";
import Report from "./CustomerService/Report";
import Noti from "./Notification/Noti";

import { useLocation } from "react-router-dom";

function AdminPage() {
  const location = useLocation().pathname.substring(7);
  const list = [
    { name: "관리자 홈", id: "home" },
    { name: "KPI", id: "kpi" },
    { name: "총 수익", id: "profit" },
    { name: "결제 내역 확인", id: "payment" },
    {
      name: "고객센터 및 신고",
      child: [
        { name: "고객센터 글 작성/수정/삭제", id: "service" },
        { name: "고객문의", id: "inquiry" },
        { name: "신고내역", id: "report" },
      ],
    },
    {
      name: "관리",
      child: [
        { name: "피드백", id: "feedback" },
        { name: "파티관리", id: "party" },
        { name: "커뮤니티", id: "community" },
        { name: "여행지 관리", id: "place" },
        { name: "가고 싶은 지역 편집", id: "city-list" },
      ],
    },
    {
      name: "회원관리",
      child: [
        { name: "드라이버 등록 심사", id: "driver-registration" },
        { name: "드라이버 회원 정보", id: "driver-info" },
        { name: "여행자 회원 정보", id: "user-info" },
        { name: "관리자 권한 부여", id: "admin-auth" },
      ],
    },
    {
      name: "알림 및 약관",
      child: [
        { name: "알림 내역 관리", id: "noti" },
        { name: "약관 수정 및 전체 메일 알림", id: "noti-mail" },
      ],
    },
  ];

  return (
    <div className="w-full">
      <AdminSideBar buttonList={list} current={location} />
      <div className="max-w-screen-xl min-h-[800px] ml-60 mx-auto mb-24 px-14 text-2xl text-black font-bold">
        {location === "home" && <AdminHome list={list} />}
        {location === "kpi" && <KPI />}
        {location === "profit" && <Profit />}
        {location === "payment" && <Payment />}
        {location === "service" && <Service />}
        {location === "report" && <Report />}
        {location === "noti" && <Noti />}
      </div>
    </div>
  );
}

export default AdminPage;
