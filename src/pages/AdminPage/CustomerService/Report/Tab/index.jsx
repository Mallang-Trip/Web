import TabList from "../../../../../components/TabList";

function Tab({ current, setCurrent }) {
  const tabList = [
    { name: "신고처리 대기", id: "waiting" },
    { name: "처리 완료 목록", id: "done" },
  ];

  const changeTab = (current) => {
    setCurrent(current);
  };

  return <TabList tabList={tabList} changeTab={changeTab} index={current} />;
}

export default Tab;
