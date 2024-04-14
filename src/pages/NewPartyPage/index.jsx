import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { getDriverInfo } from "../../api/driver";
import { getCourseDetail } from "../../api/course";
import PageContainer from "../../components/PageContainer";
import ConfirmModal from "../../components/ConfirmModal";
import Region from "./Region";
import MemberAndDate from "./MemberAndDate";
import Driver from "./Driver";
import Course from "./Course";
import Edit from "./Edit";
import Reservation from "./Reservation";
import PageButton from "./PageButton";

function NewPartyPage() {
  const navigation = useNavigate();
  const { step } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [region, setRegion] = useState("");
  const [member, setMember] = useState(1);
  const [date, setDate] = useState();
  const [driverId, setDriverId] = useState(0);
  const [driverInfo, setDriverInfo] = useState({});
  const [planData, setPlanData] = useState({});
  const [nextOK, setNextOK] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(
    location.state ? location.state.selectedCourseId : -1
  );
  const [showErrorModal, setShowErrorModal] = useState(false);

  const settingDriverInfo = async () => {
    try {
      const result = await getDriverInfo(driverId);
      setDriverInfo(result.payload);

      if (result.payload.courses.length === 0) {
        setShowErrorModal(true);
        setDriverId(0);
      } else {
        setSelectedCourseId(result.payload.courses[0].courseId);
        navigation(
          `/party/new/4?region=${region}&member=${member}&date=${date}&driverId=${driverId}`
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getCourseDetailFunc = async () => {
    try {
      const result = await getCourseDetail(selectedCourseId);
      setPlanData(result.payload);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const regionParam = searchParams.get("region");
    const memberParam = searchParams.get("member");
    const dateParam = searchParams.get("date");
    const driverIdParam = searchParams.get("driverId");

    if (regionParam !== "null") setRegion(regionParam);
    if (memberParam !== "null") setMember(Number(memberParam));
    if (driverIdParam !== "null") setDriverId(Number(driverIdParam));

    if (dateParam !== "null") setDate(dateParam);
    else {
      const today = new Date();
      setDate(
        `${today.getFullYear()}-${("0" + (1 + today.getMonth())).slice(-2)}-${(
          "0" + today.getDate()
        ).slice(-2)}`
      );
    }
  }, []);

  useEffect(() => {
    if (selectedCourseId <= 0 || !selectedCourseId) return;
    getCourseDetailFunc();
  }, [selectedCourseId]);

  useEffect(() => {
    if (!driverId) return;
    settingDriverInfo();
  }, [driverId]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [step]);

  return (
    <PageContainer>
      {step === "1" && (
        <Region
          setRegion={setRegion}
          member={member}
          driverId={driverId}
          date={date}
        />
      )}
      {step === "2" && (
        <MemberAndDate
          member={member}
          setMember={setMember}
          date={date}
          setDate={setDate}
          setNextOK={setNextOK}
        />
      )}
      {step === "3" && (
        <Driver
          date={date}
          member={member}
          region={region}
          setDriverId={setDriverId}
        />
      )}
      {step === "4" && (
        <Course
          date={date}
          driverInfo={driverInfo}
          planData={planData}
          selectedCourseId={selectedCourseId}
          setSelectedCourseId={setSelectedCourseId}
          member={member}
          region={region}
          settingDriverInfo={settingDriverInfo}
        />
      )}
      {step === "5" && (
        <Edit
          date={date}
          driverInfo={driverInfo}
          planData={planData}
          selectedCourseId={selectedCourseId}
          setSelectedCourseId={setSelectedCourseId}
          member={member}
        />
      )}
      {step === "6" && (
        <Reservation
          date={date}
          driverInfo={driverInfo}
          planData={planData}
          selectedCourseId={selectedCourseId}
          setSelectedCourseId={setSelectedCourseId}
          member={member}
        />
      )}
      <PageButton
        region={region}
        member={member}
        date={date}
        driverId={driverId}
        nextOK={nextOK}
      />
      <ConfirmModal
        showModal={showErrorModal}
        setShowModal={setShowErrorModal}
        message={
          "해당 드라이버는 제안 코스를\n등록하지 않아 선택할 수 없습니다."
        }
      />
    </PageContainer>
  );
}

export default NewPartyPage;
