import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getReportList, getReportCompleteList } from "../../../../api/admin";
import Loading from "../../../../components/Loading";
import ReportContent from "./ReportContent";
import Title from "../../../../components/Title";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import ProfileModal from "../../../../components/ProfileModal";
import Tab from "./Tab";

function Report() {
  const [searchParams] = useSearchParams();
  const [current, setCurrent] = useState(0);
  const [reportData, setReportData] = useState([]);
  const [profileInfo, setProfileInfo] = useState({});
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const status = searchParams.get("status");

  const getReportListFunc = async () => {
    try {
      const result =
        current === 0 ? await getReportList() : await getReportCompleteList();
      setReportData(result.payload);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReportListFunc();
  }, [current]);

  if (loading) return <Loading full={true} />;
  if (status) return <ReportContent setCurrent={setCurrent} />;
  return (
    <div className="text-base text-black font-medium">
      <Title title="신고 내역" />
      <Tab current={current} setCurrent={setCurrent} />
      <div className="flex flex-col w-full">
        <TableHead current={current} />
        <TableBody
          current={current}
          reportData={reportData}
          setShowProfileModal={setShowProfileModal}
          setProfileInfo={setProfileInfo}
        />
      </div>
      <ProfileModal
        showModal={showProfileModal}
        setShowModal={setShowProfileModal}
        userId={profileInfo.userId}
        reportId={profileInfo.reportId}
      />
    </div>
  );
}

export default Report;
