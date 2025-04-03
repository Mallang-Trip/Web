import { Dispatch, memo, SetStateAction, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BottomButton, Title } from "@/components";
import PartyTypeButton from "./PartyTypeButton";

interface Props {
  partyType: string;
  setPartyType: Dispatch<SetStateAction<string>>;
}

function PartyType({ partyType, setPartyType }: Props) {
  const navigation = useNavigate();

  const partyTypeList = useMemo(
    () => [
      {
        type: "New",
        title: "새로운 동행자들과 함께 하는 공유예약 🚀",
        desc: [
          "예약자님의 계획으로 말랑트립의 동행자들과\n새로운 만남으로 여행을 떠납니다.",
          "택시 정원 한도로 동행자들과 여행이 가능하며\n팀원들 간 계획 수정도 가능합니다.",
        ],
        name: "새로운 사람과 여행가기",
      },
      {
        type: "Friend",
        title: "가족, 친구, 애인 등과 함께 하는 개인예약 🚕",
        desc: [
          "예약자와 지인들의 원하는 일정으로 드라이버와\n함께 단독으로 이용합니다.",
          "택시 정원 한도로 동행자들과 여행이 가능합니다.",
        ],
        name: "나의 지인과 여행가기",
      },
    ],
    []
  );

  useEffect(() => {
    setPartyType("");
  }, []);

  return (
    <>
      <Title title="어떤 여행인가요?" className="mx-4" />
      <div className="mt-[30px] md:mt-[60px] flex flex-col md:flex-row gap-[14px] md:gap-[22px] mx-6">
        {partyTypeList.map((item) => (
          <PartyTypeButton
            key={item.type}
            partyType={partyType}
            setPartyType={setPartyType}
            {...item}
          />
        ))}
      </div>
      <BottomButton
        text="여행가기"
        disabled={partyType === ""}
        onClick={() =>
          navigation(
            "/party/new/1?region=null&member=null&date=null&driverId=null"
          )
        }
      />
    </>
  );
}

export default memo(PartyType);
