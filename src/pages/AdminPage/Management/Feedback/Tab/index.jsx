import TabList from "../../../../../components/TabList";

function Tab({ current, setCurrent }) {
  const tabList = [
    { name: "대기중", id: "waiting" },
    { name: "완료", id: "done" },
  ];

  const changeTab = (current) => {
    setCurrent(current);
  };

  return <TabList tabList={tabList} changeTab={changeTab} index={current} />;
}

export default Tab;
