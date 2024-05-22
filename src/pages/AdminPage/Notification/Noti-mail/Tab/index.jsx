import TabList from "../../../../../components/TabList";

function Tab({ current, setCurrent }) {
  const tabList = [
    { name: "약관 수정", id: "modify-terms" },
    { name: "전체 메일 알림", id: "noti-mail" },
  ];

  const changeTab = (current) => {
    setCurrent(current);
  };

  return <TabList tabList={tabList} changeTab={changeTab} index={current} />;
}

export default Tab;
