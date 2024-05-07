import { useNavigate } from "react-router-dom";

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
}) {
  const navigation = useNavigate();

  const suspensionExistFunc = (suspensionExist) => {
    if (suspensionExist)
      return <div className="text-primary font-semibold">O</div>;
    else return <div className="text-[#FF0000] font-semibold">X</div>;
  };

  return (
    <div
      className="flex items-center w-full px-5 py-3 h-10 border border-solid border-gray300 hover:border-primary rounded-xl mb-2 text-sm font-medium text-gray700 cursor-pointer"
      onClick={() =>
        navigation(`/admin/report?status=${status}&report_id=${reportId}`)
      }
    >
      <div className="w-1/5">{reporteeNickname}</div>
      <div
        className={`flex items-center relative left-1 pr-3 ${current === 0 ? "flex-1" : "w-1/5"}`}
      >
        {reporteeLoginId}
      </div>
      <div className={`${current === 0 ? "w-[12.5%] text-gray500" : "flex-1"}`}>
        {current === 0
          ? createdAt.slice(0, 10).replaceAll("-", ".")
          : suspensionContent}
      </div>
      <div
        className={`flex w-16 ${current === 0 ? "justify-end text-gray500 cursor-pointer" : "justify-center"}`}
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

export default ReportItem;
