import PageContainer from "../../components/PageContainer";
import Tab from "./Tab";
import { useState } from "react";
function AdminPage() {
  const [category, setCategory] = useState("");
  return (
    <PageContainer>
      <div className="text-2xl text-black font-bold">관리자 페이지</div>
      <div className="mt-10">
        여기는 인증된 관리자만 접근 가능한 페이지 입니다.
      </div>
      <Tab category={category} setCategory={setCategory} />
    </PageContainer>
  );
}

export default AdminPage;
