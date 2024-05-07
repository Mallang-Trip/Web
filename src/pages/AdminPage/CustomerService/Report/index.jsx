import { useEffect, useRef, useState } from "react";
import {
  getReportList,
  getReportDetail,
  getReportCompleteList,
  getReportCompleteDetail,
  updateReportComplete,
} from "../../../../api/admin";
import Loading from "../../../../components/Loading";
import TabList from "../../../../components/Admin/TabList";
import AdminProfileModal from "../../../../components/Admin/ProfileModal";
import ReportContent from "./ReportContent";

function Report() {
  const ref = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showReportContent, setShowReportContent] = useState(false);
  const cols = [
    ["피신고자 닉네임", "아이디", "신고날짜", "프로필"],
    ["닉네임", "아이디", "제재 사유", "제재 여부"],
  ];
  const [current, setCurrent] = useState(0);
  const [column, setColumn] = useState(cols[0]);
  const [dataWaiting, setDataWaiting] = useState();
  const [dataDone, setDataDone] = useState();
  const [dataList, setDataList] = useState();
  const [dataDetail, setDataDetail] = useState();
  const [userId, setUserId] = useState(0);
  const [reportId, setReportId] = useState(0);

  const getReportListFunc = async () => {
    setLoading(true);
    try {
      const result1 = await getReportList();
      const result2 = await getReportCompleteList();
      setDataWaiting(result1.payload);
      setDataDone(result2.payload);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const getReportDetailFunc = async (detailId) => {
    setLoading(true);
    try {
      const result =
        current === 0
          ? await getReportDetail(detailId)
          : await getReportCompleteDetail(detailId);
      setDataDetail(result.payload);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const updateReportCompleteFunc = async (reportId) => {
    try {
      await updateReportComplete(reportId);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getReportListFunc();
  }, []);

  useEffect(() => {
    setColumn(cols[current]);
    if (current === 0) setDataList(dataWaiting);
    else setDataList(dataDone);
  }, [current, dataWaiting, dataDone]);

  useEffect(() => {
    if (dataDetail) {
      setUserId(dataDetail.reporteeId);
      setReportId(dataDetail.reportId);
    }
  }, [dataDetail]);

  const tabList = [
    { name: "신고처리 대기", id: "waiting" },
    { name: "처리 완료 목록", id: "done" },
  ];
  const changeTab = (current) => {
    setCurrent(current);
  };
  const setWidth = (index) => {
    if (current === 0) {
      if (index === 0) return "w-1/5";
      else if (index === 1) return "flex-1";
      else if (index === 2) return "w-[12.5%]";
      else return "w-16 flex justify-end";
    } else {
      if (index === 0) return "w-1/5";
      else if (index === 1) return "w-1/5";
      else if (index === 2) return "flex-1";
      else return "w-16";
    }
  };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString)
      .toLocaleDateString("ko-KR", options)
      .replace(/\./g, "")
      .split(" ")
      .join(".");
  };
  const suspensionExistFunc = (suspensionExist) => {
    if (suspensionExist)
      return <div className="text-primary font-semibold">O</div>;
    else return <div className="text-[#F00] font-semibold">X</div>;
  };

  if (loading) return <Loading full={true} />;
  else if (showReportContent)
    return (
      <ReportContent
        current={current}
        dataDetail={dataDetail}
        handleClose={(reportId) => {
          setShowReportContent(false);
          updateReportCompleteFunc(reportId);
        }}
      />
    );
  return (
    <div className="cursor-default">
      <div className="text-2xl font-bold">신고 내역</div>
      <TabList tabList={tabList} changeTab={changeTab} />
      <div className="flex flex-col w-full">
        <div className="flex items-center w-full px-5 py-3 justify-center bg-[#EAF4FF] rounded-xl mb-2 text-sm text-[#313033]">
          {column.map((item, index) => (
            <div key={index} className={`font-semibold ${setWidth(index)}`}>
              {item}
            </div>
          ))}
        </div>
        {dataList &&
          dataList.map((item, index) => (
            <div
              key={index}
              className="flex items-center w-full px-5 py-3 h-10 border border-solid border-[#EFEFEF] rounded-xl mb-2 text-sm font-medium text-gray700"
              onClick={() => {
                getReportDetailFunc(item.reportId);
              }}
            >
              <div className="w-1/5">{item.reporteeNickname}</div>
              <div
                className={`flex items-center relative left-[-.75rem] pr-3 cursor-pointer ${current === 0 ? "flex-1" : "w-1/5"}`}
                onClick={() => setShowReportContent(true)}
              >
                <hr className="w-[0.0625rem] h-4 mr-3 bg-gray400" />
                {item.reportId}
              </div>
              <div
                className={`${current === 0 ? "w-[12.5%] text-gray500" : "flex-1"}`}
              >
                {current === 0
                  ? formatDate(item.createdAt)
                  : item.suspensionContent}
              </div>
              {current === 0 && <hr className="w-[0.0625rem] h-4 bg-gray400" />}
              <div
                className={`flex w-16 ${current === 0 ? "justify-end text-gray500 cursor-pointer" : ""}`}
              >
                {current === 0 ? (
                  <button
                    onClick={() => {
                      getReportDetailFunc(item.reportId);
                      setShowProfileModal(true);
                    }}
                  >
                    프로필
                  </button>
                ) : (
                  suspensionExistFunc(item.suspensionExist)
                )}
              </div>
            </div>
          ))}
      </div>
      <AdminProfileModal
        showModal={showProfileModal}
        setShowModal={setShowProfileModal}
        userId={userId}
        reportId={reportId}
      />
    </div>
  );
}

export default Report;
