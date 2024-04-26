import TabList from "../../../../components/Admin/TabList";

function Report() {
  const tabList = [
    { name: "신고처리 대기", id: "waiting" },
    { name: "처리 완료 목록", id: "done" },
  ];

  return (
    <div>
      <div className="text-2xl font-bold">신고 내역</div>
      <TabList tabList={tabList} />
    </div>
  );
}

export default Report;
