import { useParams } from "react-router-dom";
import AdminSideBar from "./AdminSidebar";
import AdminHome from "./AdminHome";
import KPI from "./KPI";
import Profit from "./Profit";
import Payment from "./Payment";
import Service from "./CustomerService/Service";
import Report from "./CustomerService/Report";
import Noti from "./Notification/Noti";
import Party from "./Party";
import Place from "./Place";
import Region from "./Region";
import DriverRegistration from "./DriverRegistration";
import DriverInfo from "./DriverInfo";
import UserInfo from "./UserInfo";

function AdminPage() {
  const { type } = useParams();
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
        { name: "가고 싶은 지역 편집", id: "region" },
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
      <AdminSideBar buttonList={list} current={type} />
      <div className="max-w-screen-xl min-h-[800px] ml-60 mx-auto mb-24 px-14 text-2xl text-black font-bold">
        {type === "home" && <AdminHome list={list} />}
        {type === "kpi" && <KPI />}
        {type === "profit" && <Profit />}
        {type === "payment" && <Payment />}
        {type === "service" && <Service />}
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
