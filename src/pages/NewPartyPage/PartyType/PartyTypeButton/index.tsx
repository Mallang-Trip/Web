import { Dispatch, memo, SetStateAction, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

interface Props {
  type: string;
  title: string;
  desc: string[];
  name: string;
  partyType: string;
  setPartyType: Dispatch<SetStateAction<string>>;
}

function PartyTypeButton({
  type,
  title,
  desc,
  name,
  partyType,
  setPartyType,
}: Props) {
  const navigation = useNavigate();

  const clickButton = useCallback(() => {
    setPartyType(type);
    navigation("/party/new/1?region=null&member=null&date=null&driverId=null");
  }, [type]);

  const touchHandler = useCallback(() => {
    setPartyType(type);
  }, [type]);

  return (
    <div
      className={clsx(
        "group w-full md:max-w-[360px] px-6 md:px-[30px] pb-[30px] md:pb-[240px] pt-[30px] md:pt-[100px] rounded-2xl relative md:hover:bg-skyblue md:hover:ring-[2px] ring-primary cursor-default",
        partyType === type ? "bg-skyblue ring-[2px]" : "bg-[#F8F9FD] ring-0"
      )}
      onTouchStart={touchHandler}
    >
      <span
        className={clsx(
          "px-2 py-0.5 text-white font-medium text-[10px] leading-[14px] rounded-[4px] md:group-hover:bg-primary",
          partyType === type ? "bg-primary" : "bg-[#333333]"
        )}
      >
        {type}
      </span>
      <p className="font-semibold text-lg text-[#333333] mt-2.5 mb-4">
        {title}
      </p>
      <ul className="list-disc px-4 font-normal text-xs text-darkgray marker:text-[8px]">
        <li className="whitespace-pre-wrap">{desc[0] || ""}</li>
        <li className="whitespace-pre-wrap mt-1.5">{desc[1] || ""}</li>
      </ul>
      <button
        className={clsx(
          "hidden md:block absolute left-[30px] bottom-[30px] h-[58px] rounded-2xl font-medium text-lg md:group-hover:bg-primary md:group-hover:text-white",
          partyType === type
            ? "bg-primary text-white"
            : "bg-[#EEEEEE] text-[#999999]"
        )}
        style={{ width: "calc(100% - 60px)" }}
        onClick={clickButton}
      >
        {name}
      </button>
    </div>
  );
}

export default memo(PartyTypeButton);
