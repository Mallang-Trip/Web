import PageContainer from "../../components/PageContainer";

function AdminPage() {
  return (
    <PageContainer>
      <div className="text-2xl text-black font-bold">관리자 페이지</div>
      <div className="mt-10">여기는 인증된 관리자만 접근 가능</div>
    </PageContainer>
  );
}

export default AdminPage;
