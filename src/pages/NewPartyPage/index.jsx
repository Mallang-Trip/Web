import { useState } from "react";
import { useParams } from "react-router-dom";
import Region from "./Region";
import MemberAndDate from "./MemberAndDate";
import Driver from "./Driver";
import Course from "./Course";
import Reservation from "./Reservation";

function NewPartyPage() {
  const { step } = useParams();
  const [region, setRegion] = useState("");
  const [member, setMember] = useState(1);
  const [date, setDate] = useState([]);
  const [driverId, setDriverId] = useState(0);
  const [driverInfo, setDriverInfo] = useState({});
  const [planData, setPlanData] = useState({});
  const [selectedCourseId, setSelectedCourseId] = useState(-1);

  return (
    <div className="w-full mb-24">
      {step === "1" && <Region setRegion={setRegion} />}
      {step === "2" && (
        <MemberAndDate
          member={member}
          setMember={setMember}
          date={date}
          setDate={setDate}
        />
      )}
      {step === "3" && (
        <Driver region={region} driverId={driverId} setDriverId={setDriverId} />
      )}
      {step === "4" && (
        <Course
          driverId={driverId}
          date={date}
          driverInfo={driverInfo}
          setDriverInfo={setDriverInfo}
          planData={planData}
          setPlanData={setPlanData}
          selectedCourseId={selectedCourseId}
          setSelectedCourseId={setSelectedCourseId}
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
    </div>
  );
}

export default NewPartyPage;
