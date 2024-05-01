import { useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminSideBar from "./AdminSidebar";
import AdminHome from "./AdminHome";
import KPI from "./KPI";
import Profit from "./Profit";
import Payment from "./Payment";
import Help from "./CustomerService/Help";
import Report from "./CustomerService/Report";
import Noti from "./Notification/Noti";
import Party from "./Management/Party";
import Place from "./Management/Place";
import Region from "./Management/Region";
import DriverRegistration from "./User/DriverRegistration";
import DriverInfo from "./User/DriverInfo";
import UserInfo from "./User/UserInfo";

function AdminPage() {
  const { type } = useParams();
  const menuList = [
    { name: "관리자 홈", id: "home" },
    { name: "KPI", id: "kpi" },
    { name: "총 수익", id: "profit" },
    { name: "결제 내역 확인", id: "payment" },
    {
      name: "고객센터 및 신고",
      id: "customerService",
      child: [
        { name: "고객센터 글 작성/수정/삭제", id: "help" },
        { name: "고객문의", id: "inquiry" },
        { name: "신고내역", id: "report" },
      ],
    },
    {
      name: "관리",
      id: "management",
      child: [
        { name: "피드백", id: "feedback" },
        { name: "파티관리", id: "party" },
        { name: "커뮤니티", id: "community" },
        { name: "여행지 관리", id: "place" },
        { name: "가고 싶은 지역 편집", id: "region" },
      ],
    },
    {
      name: "회원관리",
      id: "userManagement",
      child: [
        { name: "드라이버 등록 심사", id: "driver-registration" },
        { name: "드라이버 회원 정보", id: "driver-info" },
        { name: "여행자 회원 정보", id: "user-info" },
        { name: "관리자 권한 부여", id: "admin-auth" },
      ],
    },
    {
      name: "알림 및 약관",
      id: "notification",
      child: [
        { name: "알림 내역 관리", id: "noti" },
        { name: "약관 수정 및 전체 메일 알림", id: "noti-mail" },
      ],
    },
  ];

  useEffect(() => window.scrollTo({ top: 0 }), [type]);

  return (
    <div className="w-full">
      <AdminSideBar menuList={menuList} />
      <div className="max-w-screen-xl min-h-[800px] ml-60 mx-auto mb-24 px-14 text-2xl text-black font-bold">
        {type === "home" && <AdminHome menuList={menuList} />}
        {type === "kpi" && <KPI />}
        {type === "profit" && <Profit />}
        {type === "payment" && <Payment />}
        {type === "help" && <Help />}
        {type === "report" && <Report />}
        {type === "noti" && <Noti />}
        {type === "party" && <Party />}
        {type === "place" && <Place />}
        {type === "region" && <Region />}
        {type === "driver-registration" && <DriverRegistration />}
        {type === "driver-info" && <DriverInfo />}
        {type === "user-info" && <UserInfo />}
      </div>
    </div>
  );
}

export default AdminPage;
