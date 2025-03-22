import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDriverInfo } from "@/api/driver";
import { getCourseDetail } from "@/api/course";
import { RootState } from "@/redux/store";
import { isGAlive } from "@/utils/ga";
import { Course as CourseType } from "@/types";
import { PageContainer, ConfirmModal, Loading } from "@/components";
import ReactGA from "react-ga4";
import Region from "./Region";
import MemberAndDate from "./MemberAndDate";
import Driver from "./Driver";
import Course from "./Course";
import Edit from "./Edit";
import Reservation from "./Reservation";
import PartyType from "./PartyType";

function NewPartyPage() {
  const navigation = useNavigate();
  const { step } = useParams();
  const user = useSelector((state: RootState) => state.user);
  const [searchParams] = useSearchParams();
  const [partyType, setPartyType] = useState("");
  const [region, setRegion] = useState("");
  const [member, setMember] = useState(1);
  const [date, setDate] = useState("");
  const [driverId, setDriverId] = useState<string | number>(
    searchParams.get("driverId") || "null"
  );
  const [selectedCourseId, setSelectedCourseId] = useState(
    Number(searchParams.get("selectedCourseId")) || 0
  );
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [planData, setPlanData] = useState<CourseType>({
    capacity: 0,
    courseId: 0,
    discountPrice: 0,
    images: [],
    name: "",
    region: "",
    totalDays: 0,
    totalPrice: 0,
    days: [],
  });
  const [driverInfo, setDriverInfo] = useState({
    driverId: 0,
    reservationCount: 0,
    avgRate: null,
    reviews: [],
    accountHolder: "",
    accountNumber: "",
    bank: "",
    courses: [],
    driverLicenceImg: "",
    holidays: [],
    insuranceLicenceImg: "",
    introduction: "",
    name: "",
    phoneNumber: "",
    prices: [],
    profileImg: null,
    region: [],
    status: "",
    taxiLicenceImg: "",
    userId: 0,
    vehicleCapacity: 0,
    vehicleImgs: [],
    vehicleModel: "",
    vehicleNumber: "",
    weeklyHoliday: [],
  });

  const settingDriverInfo = useCallback(async () => {
    try {
      const result = await getDriverInfo(driverId);

      if (result.statusCode === 404) {
        const newStep =
          searchParams.get("date") !== "null"
            ? 3
            : searchParams.get("region")
              ? 2
              : 1;
        navigation(
          `/party/new/${newStep}?region=${region}&member=${member}&date=${date}&driverId=${null}`,
          { replace: true }
        );
        return;
      }

      setDriverInfo(result.payload);
      setPlanData((planData) => ({
        ...planData,
        capacity: result.payload.vehicleCapacity,
      }));

      if (
        (typeof selectedCourseId === "number" && selectedCourseId < 0) ||
        (typeof selectedCourseId === "string" && parseInt(selectedCourseId) < 0)
      ) {
        navigation(
          `/party/new/${searchParams.get("date") !== "null" ? 5 : 1}?region=${region}&member=${member}&date=${date}&driverId=${driverId}`,
          { replace: true }
        );
      } else {
        setSelectedCourseId(
          selectedCourseId || result.payload.courses[0].courseId
        );
        const newStep =
          searchParams.get("date") !== "null"
            ? 4
            : searchParams.get("region")
              ? 2
              : 1;
        navigation(
          `/party/new/${newStep}?region=${region}&member=${member}&date=${date}&driverId=${driverId}`,
          { replace: step !== "3" }
        );
      }
    } catch (e) {
      console.log(e);
    }
  }, [driverId, region, member, date, selectedCourseId]);

  const getCourseDetailFunc = useCallback(async () => {
    if (
      (typeof selectedCourseId === "number" && selectedCourseId < 0) ||
      (typeof selectedCourseId === "string" && parseInt(selectedCourseId) < 0)
    )
      setPlanData((planData) => ({
        capacity: planData?.capacity || 4,
        courseId: -1,
        days: [
          {
            destinations: [],
            endTime: "",
            hours: 0,
            price: 0,
            startTime: "10:00",
            day: 0,
          },
        ],
        discountPrice: 0,
        images: [],
        region: "",
        totalDays: 1,
        totalPrice: 0,
        name: "",
      }));
    else
      try {
        const result = await getCourseDetail(selectedCourseId);
        setPlanData(result.payload);
      } catch (e) {
        console.log(e);
      }
  }, [selectedCourseId, planData]);

  useEffect(() => {
    if (showErrorModal) return;
    if (errorMessage !== "여행자만 일정을 만들 수 있습니다.") return;
    navigation(-1);
  }, [showErrorModal]);

  useEffect(() => {
    if (user.role !== "ROLE_USER") {
      setErrorMessage("여행자만 일정을 만들 수 있습니다.");
      setShowErrorModal(true);
      return;
    }

    const regionParam = searchParams.get("region");
    const memberParam = searchParams.get("member");
    const dateParam = searchParams.get("date");
    const driverIdParam = searchParams.get("driverId");

    if (regionParam !== "null") setRegion(regionParam || "null");
    if (memberParam !== "null")
      setMember(
        Number(memberParam) >= 1 && Number(memberParam) <= 10
          ? Number(memberParam)
          : 1
      );
    if (driverIdParam !== "null") setDriverId(driverIdParam || "null");
    if (dateParam !== "null" && dateParam !== null) {
      const tomorrow = new Date();
      const after_4_month = new Date(tomorrow);
      tomorrow.setDate(tomorrow.getDate() + 1);
      after_4_month.setMonth(after_4_month.getMonth() + 4);

      if (
        new Date(dateParam) < tomorrow ||
        new Date(dateParam) > after_4_month
      ) {
        navigation(
          `/party/new/1?region=null&member=null&date=null&driverId=null`,
          { replace: true }
        );
      } else setDate(dateParam);
    } else {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDate(
        `${tomorrow.getFullYear()}-${("0" + (1 + tomorrow.getMonth())).slice(-2)}-${(
          "0" + tomorrow.getDate()
        ).slice(-2)}`
      );
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (selectedCourseId !== 0) {
      getCourseDetailFunc();
    }
  }, [selectedCourseId]);

  useEffect(() => {
    if (
      driverId &&
      ((typeof driverId === "string" && parseInt(driverId) > 0) ||
        (typeof driverId === "number" && driverId > 0))
    )
      settingDriverInfo();
  }, [driverId]);

  useEffect(() => {
    window.scrollTo({ top: 0 });

    if (step === "4") {
      navigation(
        `/party/new/6?region=${region}&member=${member}&date=${date}&driverId=${driverId}`,
        { replace: true }
      );
    }

    if (isGAlive()) {
      let eventName = "";

      if (step === "1") eventName = "06_new_party";
      if (step === "2") eventName = `06_new_party_${region}`;
      if (step === "3") eventName = "07_selectdriver";
      if (step === "5") eventName = "09_new_chagecourses";

      ReactGA.event({
        category: "새로운 파티 만들기",
        action: eventName,
      });
    }
  }, [step]);

  if (loading) return <Loading full={true} />;
  return (
    <PageContainer>
      {step === "0" && (
        <PartyType partyType={partyType} setPartyType={setPartyType} />
      )}
      {step === "1" && (
        <Region
          setRegion={setRegion}
          member={member}
          driverId={driverId || "null"}
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
          driverId={driverId || "null"}
          selectedCourseId={selectedCourseId}
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
          setPlanData={setPlanData}
          selectedCourseId={selectedCourseId}
          setSelectedCourseId={setSelectedCourseId}
          member={member}
          region={region}
          partyType={partyType}
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
          partyType={partyType}
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

export default memo(NewPartyPage);
