import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPartyRoomId } from "../../../../../redux/modules/talkRoomSlice";
import { makeNewCoupleChat } from "../../../../../api/chat";
import { Report } from "../../../../../types";
import {
  getReportCompleteDetail,
  getReportDetail,
  updateReportComplete,
} from "../../../../../api/admin";
import Loading from "../../../../../components/Loading";
import reportVector from "../../../../../assets/svg/report-vector.svg";
import MallangTalkModal from "./MallangTalkModal";
import ProfileModal from "../../../../../components/ProfileModal";
import clsx from "clsx";

interface Props {
  setCurrent: Dispatch<SetStateAction<number>>;
}

function ReportContent({ setCurrent }: Props) {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [profileId, setProfileId] = useState(0);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showTalkModal, setShowTalkModal] = useState(false);
  const [status, reportId] = [
    searchParams.get("status"),
    searchParams.get("report_id"),
  ];
  const [reportDetail, setReportDetail] = useState<Report>({
    content: "",
    createdAt: "",
    reportId: 0,
    reporteeId: 0,
    reporteeLoginId: "",
    reporteeNickname: "",
    reporterId: 0,
    reporterLoginId: "",
    reporterNickname: "",
    status: "",
    targetId: 0,
    type: "",
    suspensionContent: "",
    suspensionExist: false,
  });

  const getReportDetailFunc = useCallback(async () => {
    try {
      const result =
        status === "WAITING"
          ? await getReportDetail(reportId)
          : await getReportCompleteDetail(reportId);
      setReportDetail(result.payload);

      if (result.payload.status !== status)
        navigation(
          `/admin/report?status=${result.payload.status}&report_id=${reportId}`,
          { replace: true }
        );
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [status, reportId]);

  const updateReportCompleteFunc = useCallback(async () => {
    try {
      await updateReportComplete(reportId);
      setCurrent(1);
      navigation(-1);
    } catch (e) {
      console.log(e);
      alert("처리 실패");
    }
  }, [reportId]);

  const goCoupleChat = useCallback(async (userId: number) => {
    try {
      const result = await makeNewCoupleChat(userId);
      dispatch(setPartyRoomId(result.payload.chatRoomId));
      navigation("/talk");
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getReportDetailFunc();
  }, [showProfileModal]);

  if (loading) return <Loading full={true} />;
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="text-2xl text-black font-bold">
            {status === "WAITING" ? "신고 내용" : "처리 완료 내용"}
          </div>
          <div className="text-boldgray text-sm font-medium">
            {reportDetail.createdAt.slice(0, 10).replaceAll("-", ".")}
          </div>
        </div>
        <div className="flex mb-12">
          <button
            className="flex items-center gap-1"
            onClick={() =>
              reportDetail.type === "CHAT"
                ? setShowTalkModal(true)
                : navigation(`/community/${reportDetail.targetId}`)
            }
          >
            <span className="text-gray500 text-sm font-medium">
              신고 당한 페이지로 이동
            </span>
            <img src={reportVector} alt="신고 당한 페이지로 이동" />
          </button>
        </div>
        <div className="flex flex-col lg:flex-row gap-3">
          <div
            className="flex items-center px-5 py-3 text-sm font-bold rounded-xl bg-[#FFEAEA] cursor-pointer"
            onClick={() => {
              setProfileId(reportDetail.reporteeId);
              setShowProfileModal(true);
            }}
          >
            피신고자
            <hr className="w-[0.0625rem] h-4 mx-3 bg-gray400" />
            <div className="text-[#FF0000] mr-1">
              {reportDetail.reporteeNickname}
            </div>
            <span className="font-medium">
              ({reportDetail.reporteeLoginId})
            </span>
            <hr className="w-[0.0625rem] h-4 mx-3 bg-gray400" />
            <button
              className="text-[#FF0000] hover:text-black"
              onClick={(e) => {
                e.stopPropagation();
                goCoupleChat(reportDetail.reporteeId);
              }}
            >
              말랑챗
            </button>
          </div>
          <div
            className="flex items-center px-5 py-3 text-sm font-bold rounded-xl bg-skyblue cursor-pointer"
            onClick={() => {
              setProfileId(reportDetail.reporterId);
              setShowProfileModal(true);
            }}
          >
            신고자
            <hr className="w-[0.0625rem] h-4 mx-3 bg-gray400" />
            <div className="text-primary mr-1">
              {reportDetail.reporterNickname}
            </div>
            <span className="font-medium">
              ({reportDetail.reporterLoginId})
            </span>
            <hr className="w-[0.0625rem] h-4 mx-3 bg-gray400" />
            <button
              className="text-primary hover:text-black"
              onClick={(e) => {
                e.stopPropagation();
                goCoupleChat(reportDetail.reporterId);
              }}
            >
              말랑챗
            </button>
          </div>
        </div>
        {status === "WAITING" ? (
          <div className="w-full h-72 max-h-fit mt-4 mb-8 border border-gray300 p-7 text-gray700 text-base font-medium">
            {reportDetail.content}
          </div>
        ) : (
          <div className="flex flex-col mt-10">
            <div className="flex w-full mb-5">
              <div className="flex items-center w-fit h-16 px-3 py-5 bg-lightgray rounded-xl mr-3 text-xs text-boldgray font-semibold">
                신고 내용
              </div>
              <div className="pl-5 flex items-center text-base font-medium border border-gray300 rounded-xl flex-1">
                {reportDetail.content}
              </div>
            </div>
            <div className="flex w-full mb-5">
              <div className="flex items-center w-fit h-16 px-3 py-5 bg-lightgray rounded-xl mr-3 text-xs text-boldgray font-semibold">
                제재 사유
              </div>
              <div className="pl-5 flex items-center text-base font-medium border border-gray300 rounded-xl flex-1">
                {reportDetail.suspensionContent || "X"}
              </div>
            </div>
            <div className="flex w-full mb-5">
              <div className="flex items-center w-fit h-16 px-3 py-5 bg-lightgray rounded-xl mr-3 text-xs text-boldgray font-semibold">
                제재 여부
              </div>
              <div
                className={clsx(
                  "pl-5 flex items-center text-base font-medium border border-gray300 rounded-xl flex-1",
                  reportDetail.suspensionExist
                    ? "text-primary"
                    : "text-[#FF0000]"
                )}
              >
                {reportDetail.suspensionExist ? "O" : "X"}
              </div>
            </div>
          </div>
        )}
        {status === "WAITING" && (
          <div className="flex justify-center">
            <button
              className="w-80 h-14 bg-primary text-white text-base font-bold rounded-full"
              onClick={updateReportCompleteFunc}
            >
              처리 완료
            </button>
          </div>
        )}
      </div>
      <MallangTalkModal
        showModal={showTalkModal}
        setShowModal={setShowTalkModal}
        roomId={reportDetail.targetId}
        reportId={reportDetail.reportId}
      />
      <ProfileModal
        showModal={showProfileModal}
        setShowModal={setShowProfileModal}
        userId={profileId}
        reportId={reportDetail.reportId}
        driverName={false}
      />
    </div>
  );
}

export default memo(ReportContent);
