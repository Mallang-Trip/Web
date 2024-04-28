import { useState } from "react";
import TabList from "../../../../components/Admin/TabList";
import Table from "../../../../components/Admin/Table";

function Report() {
  const [current, setCurrent] = useState(0);
  const tabList = [
    { name: "신고처리 대기", id: "waiting" },
    { name: "처리 완료 목록", id: "done" },
  ];
  const columnsWaiting = ["피신고자 닉네임", "아이디", "신고날짜", "프로필"];
  const columnsDone = ["닉네임", "아이디", "제재 사유", "제재 여부"];
  const dataWaiting = [
    ["PrimeMinister", "id1234", "2023-09-30"],
    ["NAVYDI", "id1234", "2023-09-30"],
    ["메루옹", "id1234", "2023-09-30"],
    ["하이요123", "id1234", "2023-09-30"],
    ["누구안녕하세여", "id1234", "2023-09-30"],
    ["qweR", "id1234", "2023-09-30"],
    ["열글자닉네임임임임", "id1234", "2023-09-30"],
  ];
  const dataDone = [
    ["PrimeMinister", "id1234", "욕설, 비난", 1],
    ["NAVYDI", "id1234", "성적인 발언", 1],
    ["메루옹", "id1234", "비하 발언", 1],
    ["하이요123", "id1234", "", 0],
  ];

  const changeTab = (current) => {
    setCurrent(current);
  };

  return (
    <div>
      <div className="text-2xl font-bold">신고 내역</div>
      <TabList tabList={tabList} changeTab={changeTab} />
      <Table
        columns={current === 0 ? columnsWaiting : columnsDone}
        data={current === 0 ? dataWaiting : dataDone}
      />
    </div>
  );
}

export default Report;
