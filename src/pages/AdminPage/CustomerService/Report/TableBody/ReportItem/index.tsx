import { Dispatch, memo, SetStateAction, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Report } from "../../../../../../types";
import clsx from "clsx";

interface Props extends Report {
  current: number;
  setShowProfileModal: Dispatch<SetStateAction<boolean>>;
  setProfileInfo: Dispatch<
    SetStateAction<{ userId: number; reportId: number }>
  >;
}

function ReportItem({
  current,
  reportId,
  reporteeNickname,
  reporteeLoginId,
  createdAt,
  suspensionContent,
  reporteeId,
  suspensionExist,
  status,
  setProfileInfo,
  setShowProfileModal,
}: Props) {
  const navigation = useNavigate();

  const suspensionExistFunc = useCallback((suspensionExist: boolean) => {
    if (suspensionExist)
      return <div className="text-primary font-semibold">O</div>;
    return <div className="text-[#FF0000] font-semibold">X</div>;
  }, []);

  return (
    <div
      className="flex items-center w-full px-5 py-3 h-10 border border-solid border-gray300 hover:border-primary rounded-xl mb-2 text-sm font-medium text-gray700 cursor-pointer"
      onClick={() =>
        navigation(`/admin/report?status=${status}&report_id=${reportId}`)
      }
    >
      <div className="w-1/5">{reporteeNickname}</div>
      <div
        className={clsx(
          "flex items-center relative left-1 pr-3",
          current === 0 ? "flex-1" : "w-1/5"
        )}
      >
        {reporteeLoginId}
      </div>
      <div
        className={clsx(current === 0 ? "w-[12.5%] text-gray500" : "flex-1")}
      >
        {current === 0
          ? createdAt.slice(0, 10).replaceAll("-", ".")
          : suspensionContent}
      </div>
      <div
        className={clsx("flex w-16", {
          "justify-end text-gray500 cursor-pointer": current === 0,
          "justify-center": current !== 0,
        })}
      >
        {current === 0 ? (
          <button
            className="hover:font-bold"
            onClick={(e) => {
              e.stopPropagation();
              setProfileInfo({
                userId: reporteeId,
                reportId: reportId,
              });
              setShowProfileModal(true);
            }}
          >
            프로필
          </button>
        ) : (
          suspensionExistFunc(suspensionExist)
        )}
      </div>
    </div>
  );
}

export default memo(ReportItem);
