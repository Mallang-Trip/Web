import { Dispatch, memo, SetStateAction } from "react";
import { Report } from "@/types";
import ReportItem from "./ReportItem";

interface Props {
  current: number;
  reportData: Report[];
  setShowProfileModal: Dispatch<SetStateAction<boolean>>;
  setProfileInfo: Dispatch<
    SetStateAction<{ userId: number; reportId: number }>
  >;
}

function TableBody({
  current,
  reportData,
  setShowProfileModal,
  setProfileInfo,
}: Props) {
  if (reportData.length === 0)
    return <div className="mt-20 text-center">목록이 비어있습니다.</div>;
  return (
    <div>
      {reportData.map((item) => (
        <ReportItem
          key={item.reportId}
          current={current}
          setProfileInfo={setProfileInfo}
          setShowProfileModal={setShowProfileModal}
          {...item}
        />
      ))}
    </div>
  );
}

export default memo(TableBody);
