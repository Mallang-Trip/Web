import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { getDriverInfo } from "../../api/driver";
import { getCourseDetail } from "../../api/course";
import PageContainer from "../../components/PageContainer";
import Region from "./Region";
import MemberAndDate from "./MemberAndDate";
import Driver from "./Driver";
import Course from "./Course";
import Reservation from "./Reservation";
import PageButton from "./PageButton";

function NewPartyPage() {
  const { step } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [region, setRegion] = useState("");
  const [member, setMember] = useState(1);
  const [date, setDate] = useState();
  const [driverId, setDriverId] = useState(0);
  const [driverInfo, setDriverInfo] = useState({});
  const [planData, setPlanData] = useState({});
  const [selectedCourseId, setSelectedCourseId] = useState(
    location.state ? location.state.selectedCourseId : -1
  );

  const settingDriverInfo = async () => {
    try {
      const result = await getDriverInfo(driverId);
      setDriverInfo(result.payload);
      if (!location.state)
        setSelectedCourseId(result.payload.courses[0].courseId);
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
        />
      )}
      {step === "3" && (
        <Driver
          date={date}
          member={member}
          region={region}
          driverId={driverId}
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
        />
      )}
      {step === "6" && (
        <Reservation
          member={member}
          date={date}
          driverInfo={driverInfo}
          planData={planData}
        />
      )}
      <PageButton
        region={region}
        member={member}
        date={date}
        driverId={driverId}
      />
    </PageContainer>
  );
}

export default NewPartyPage;
