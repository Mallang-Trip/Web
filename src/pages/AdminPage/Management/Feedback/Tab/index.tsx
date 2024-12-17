import { Dispatch, memo, SetStateAction, useCallback, useMemo } from "react";
import { TabList } from "@/components";

interface Props {
  current: number;
  setCurrent: Dispatch<SetStateAction<number>>;
}

function Tab({ current, setCurrent }: Props) {
  const tabList = useMemo(
    () => [
      { name: "대기중", id: "waiting" },
      { name: "완료", id: "done" },
    ],
    []
  );

  const changeTab = useCallback((current: number) => {
    setCurrent(current);
  }, []);

  return <TabList tabList={tabList} changeTab={changeTab} index={current} />;
}

export default memo(Tab);
