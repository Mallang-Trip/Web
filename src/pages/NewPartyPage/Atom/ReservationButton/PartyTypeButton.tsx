import { Dispatch, memo, SetStateAction, useMemo } from "react";

interface Props {
  setPartyType: Dispatch<SetStateAction<string>>;
  joinHandler: () => void;
}

function PartyTypeButton({ setPartyType, joinHandler }: Props) {
  const partyTypeList = useMemo(
    () => [
      {
        type: "New",
        title: "새로운 여행자들과 떠나는 여행 🚀",
        desc: [
          "예약자님의 계획으로 말랑트립의 동행자들과\n새로운 만남으로 여행을 떠납니다.",
          "택시 정원 한도로 동행자들과 여행이 가능하며\n팀원들 간 계획 수정도 가능합니다.",
        ],
        name: "새로운 사람과 여행가기",
        onClick: () => {
          setPartyType("New");
          joinHandler();
        },
      },
      {
        type: "Friend",
        title: "나의 지인들과 소중한 여행 🚕",
        desc: [
          "예약자와 지인들의 원하는 일정으로 드라이버와\n함께 단독으로 이용합니다.",
          "택시 정원 한도로 동행자들과 여행이 가능합니다.",
        ],
        name: "나의 지인과 여행가기",
        onClick: () => {
          setPartyType("Friend");
          joinHandler();
        },
      },
    ],
    [setPartyType, joinHandler]
  );

  return (
    <div className="mt-[30px] md:mt-[60px] flex flex-col md:flex-row gap-[14px] md:gap-[22px] mx-auto justify-center">
      {partyTypeList.map((item) => (
        <PartyTypeItem key={item.type} {...item} />
      ))}
    </div>
  );
}

interface Item {
  type: string;
  title: string;
  desc: string[];
  onClick: () => void;
}

function PartyTypeItem({ type, title, desc, onClick }: Item) {
  return (
    <div
      onClick={onClick}
      className="group w-full md:max-w-[360px] px-6 md:px-[30px] pb-[30px] md:pb-[40px] pt-[30px] md:pt-[40px] rounded-2xl relative md:hover:bg-skyblue md:hover:ring-[2px] ring-primary cursor-pointer bg-[#F8F9FD] ring-0"
    >
      <span className="px-2 py-0.5 text-white font-medium text-[10px] leading-[14px] rounded-[4px] md:group-hover:bg-primary bg-[#333333]">
        {type}
      </span>
      <p className="font-semibold text-lg text-[#333333] mt-2.5 mb-4">
        {title}
      </p>
      <ul className="list-disc px-4 font-normal text-xs text-darkgray marker:text-[8px]">
        <li className="whitespace-pre-wrap">{desc[0] || ""}</li>
        <li className="whitespace-pre-wrap mt-1.5">{desc[1] || ""}</li>
      </ul>
    </div>
  );
}

export default memo(PartyTypeButton);
