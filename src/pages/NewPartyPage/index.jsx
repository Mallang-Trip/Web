import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
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

function NewPartyPage() {
  const navigation = useNavigate();
  const { step } = useParams();
  const user = useSelector((state) => state.user);
  const [searchParams] = useSearchParams();
  const [region, setRegion] = useState("");
  const [courseRegion, setCourseRegion] = useState("");
  const [member, setMember] = useState(1);
  const [date, setDate] = useState();
  const [driverId, setDriverId] = useState(searchParams.get("driverId"));
  const [driverInfo, setDriverInfo] = useState({});
  const [planData, setPlanData] = useState({});
  const [selectedCourseId, setSelectedCourseId] = useState(
    searchParams.get("selectedCourseId") || 0
  );
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const settingDriverInfo = async () => {
    try {
      const result = await getDriverInfo(driverId);
      setDriverInfo(result.payload);

      if (result.payload.courses.length === 0) {
        //   setShowErrorModal(true);
        //   setErrorMessage(
        //     "해당 드라이버는 제안 코스를\n등록하지 않아 선택할 수 없습니다."
        //   );
        //   setDriverId(0);

        navigation(
          `/party/new/1?region=${region}&member=${member}&date=${null}&driverId=${driverId}`
        );
      } else {
        setSelectedCourseId(
          selectedCourseId || result.payload.courses[0].courseId
        );
        if (searchParams.get("date") !== "null") {
          navigation(
            `/party/new/4?region=${region}&member=${member}&date=${date}&driverId=${driverId}`
          );
        }
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
    if (showErrorModal) return;
    if (errorMessage !== "여행자만 파티를 만들 수 있습니다.") return;
    navigation(-1);
  }, [showErrorModal]);

  useEffect(() => {
    if (user.role !== "ROLE_USER") {
      setErrorMessage("여행자만 파티를 만들 수 있습니다.");
      setShowErrorModal(true);
      return;
    }

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
    if (driverId > 0) settingDriverInfo();
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
          driverInfo={driverInfo}
        />
      )}
      {step === "2" && (
        <MemberAndDate
          member={member}
          setMember={setMember}
          date={date}
          setDate={setDate}
          region={region}
          driverId={driverId}
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
          setRegion={setRegion}
          settingDriverInfo={settingDriverInfo}
        />
      )}
      {step === "5" && (
        <Edit
          date={date}
          driverInfo={driverInfo}
          courseRegion={courseRegion}
          setCourseRegion={setCourseRegion}
          planData={planData}
          setPlanData={setPlanData}
          selectedCourseId={selectedCourseId}
          setSelectedCourseId={setSelectedCourseId}
          member={member}
          region={region}
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
          region={region}
          setRegion={setRegion}
        />
      )}
      <ConfirmModal
        showModal={showErrorModal}
        setShowModal={setShowErrorModal}
        message={errorMessage}
      />
    </PageContainer>
  );
}

export default NewPartyPage;
