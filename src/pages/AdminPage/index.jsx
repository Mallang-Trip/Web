import { useNavigate } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import Tab from "./Tab";
import { useState } from "react";
function AdminPage() {
  const [category, setCategory] = useState("어드민 홈");
  const navigate = useNavigate();
  if (category === "기본 페이지 전환") {
    navigate("");
  }
  if (category === "신고 내역") {
    navigate("/admin/reportRecord");
  }
  return (
    <PageContainer>
      <div className="text-2xl text-black font-bold">관리자 페이지</div>
      <div className="mt-5">
        여기는 인증된 관리자만 접근 가능한 페이지 입니다.
      </div>
      <Tab category={category} setCategory={setCategory} />
    </PageContainer>
  );
}

export default AdminPage;
