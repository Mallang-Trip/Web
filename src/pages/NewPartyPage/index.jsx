import { useState } from "react";
import { useParams } from "react-router-dom";
import Region from "./Region";
import MemberAndDate from "./MemberAndDate";
import Driver from "./Driver";

function NewPartyPage() {
  const { step } = useParams();
  const [region, setRegion] = useState("");
  const [member, setMember] = useState(1);
  const [date, setDate] = useState([]);

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
      {step === "3" && <Driver region={region} />}
    </div>
  );
}

export default NewPartyPage;
