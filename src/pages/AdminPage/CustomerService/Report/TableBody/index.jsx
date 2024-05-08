import ReportItem from "./ReportItem";

function TableBody({
  current,
  reportData,
  setShowProfileModal,
  setProfileInfo,
}) {
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

export default TableBody;
