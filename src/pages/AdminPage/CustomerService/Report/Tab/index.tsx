import { Dispatch, memo, SetStateAction, useCallback, useMemo } from "react";
import TabList from "../../../../../components/TabList";

interface Props {
  current: number;
  setCurrent: Dispatch<SetStateAction<number>>;
}

function Tab({ current, setCurrent }: Props) {
  const tabList = useMemo(
    () => [
      { name: "신고처리 대기", id: "waiting" },
      { name: "처리 완료 목록", id: "done" },
    ],
    []
  );

  const changeTab = useCallback((current: number) => {
    setCurrent(current);
  }, []);

  return <TabList tabList={tabList} changeTab={changeTab} index={current} />;
}

export default memo(Tab);
