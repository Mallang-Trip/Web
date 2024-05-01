function ReportContent({ current, dataDetail, handleClose }) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString)
      .toLocaleDateString("ko-KR", options)
      .replace(/\./g, "")
      .split(" ")
      .join(".");
  };
  return (
    <div className="cursor-default">
      <div className="flex flex-col">
        <div className="flex items-center mb-2">
          <div className="text-2xl font-bold mr-2">
            {current === 0 ? "신고 내용" : "처리 완료 내용"}
          </div>
          <div className="text-boldgray text-sm font-medium">
            {formatDate(dataDetail.createdAt)}
          </div>
        </div>
        <div className="flex mb-12">
          <button
            className="text-gray500 text-sm font-medium"
            onClick={handleClose}
          >
            신고 당한 페이지로 이동
          </button>
        </div>
        <div className="flex">
          <div className="flex cursor-pointer items-center px-5 py-3 text-sm font-bold rounded-xl bg-[#FFEAEA] mr-3">
            피신고자
            <hr className="w-[0.0625rem] h-4 mx-3 bg-gray400" />
            <div className="text-[#F00] mr-1">
              {dataDetail.reporteeNickname}
            </div>
            ({dataDetail.reporteeId})
            {current !== 0 && (
              <hr className="w-[0.0625rem] h-4 mx-3 bg-gray400" />
            )}
            {current !== 0 && <div className="text-[#F00]">말랑톡</div>}
          </div>
          <div className="flex cursor-pointer items-center px-5 py-3 text-sm font-bold rounded-xl bg-skyblue">
            신고자
            <hr className="w-[0.0625rem] h-4 mx-3 bg-gray400" />
            <div className="text-primary mr-1">
              {dataDetail.reporteeNickname}
            </div>
            ({dataDetail.reporteeId})
            <hr className="w-[0.0625rem] h-4 mx-3 bg-gray400" />
            <div className="text-primary">말랑톡</div>
          </div>
        </div>
        {current === 0 ? (
          <div className="w-full h-72 max-h-fit mt-4 mb-8 border border-gray300 p-7 text-gray700 text-base font-medium">
            {dataDetail.content}
          </div>
        ) : (
          <div className="flex flex-col mt-10">
            <div className="flex w-full mb-5">
              <div className="flex items-center w-fit h-16 px-3 py-5 bg-lightgray rounded-xl mr-3 text-xs font-semibold">
                신고 내용
              </div>
              <div className="px-4 py-5 text-base font-medium border border-gray300 rounded-xl flex-1">
                {dataDetail.suspensionContent}
              </div>
            </div>
            <div className="flex w-full mb-5">
              <div className="flex items-center w-fit h-16 px-3 py-5 bg-lightgray rounded-xl mr-3 text-xs font-semibold">
                제재 사유
              </div>
              <div className="px-4 py-5 text-base font-medium border border-gray300 rounded-xl flex-1">
                {dataDetail.suspensionContent}
              </div>
            </div>
            <div className="flex w-full mb-5">
              <div className="flex items-center w-fit h-16 px-3 py-5 bg-lightgray rounded-xl mr-3 text-xs font-semibold">
                제재 여부
              </div>
              <div
                className={`px-4 py-5 text-base font-medium border border-gray300 rounded-xl flex-1 ${dataDetail.suspensionExist ? "text-primary" : "text-[#F00]"}`}
              >
                {dataDetail.suspensionExist ? "O" : "X"}
              </div>
            </div>
          </div>
        )}
        {current === 0 && (
          <div className="flex justify-center">
            <button
              className="w-80 h-12 bg-primary text-white text-xl font-bold rounded-full px-5 py-1"
              onClick={() => handleClose(dataDetail.reportId)}
            >
              처리 완료
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportContent;
