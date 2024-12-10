import { Dispatch, memo, SetStateAction, useCallback, useMemo } from "react";
import TabList from "../../../../../components/TabList";

interface Props {
  current: number;
  setCurrent: Dispatch<SetStateAction<number>>;
}

function Tab({ current, setCurrent }: Props) {
  const tabList = useMemo(
    () => [
      { name: "약관 수정", id: "modify-terms" },
      { name: "전체 메일 알림", id: "noti-mail" },
    ],
    []
  );

  const changeTab = useCallback((current: number) => {
    setCurrent(current);
  }, []);

  return <TabList tabList={tabList} changeTab={changeTab} index={current} />;
}

export default memo(Tab);
