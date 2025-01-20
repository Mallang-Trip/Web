import { memo } from "react";
import { HeartParty } from "@/types";
import HeartItem from "./HeartItem";

interface Props {
  myHeartData: HeartParty[];
  selectPartyHandler: (party: { name: string; partyId: number }) => void;
}

function HeartList({ myHeartData, selectPartyHandler }: Props) {
  if (myHeartData.length === 0)
    return (
      <div className="h-[430px] flex justify-center items-center">
        <p className="text-base text-center text-black">
          나의 일정 찜 목록이 비어있습니다.
        </p>
      </div>
    );
  return (
    <div className="grid gap-10 mt-9 mx-auto grid-cols-2 md:grid-cols-3 h-[430px] custom-scrollbar">
      {myHeartData.map((item, index) => (
        <HeartItem
          key={index}
          selectPartyHandler={selectPartyHandler}
          {...item}
        />
      ))}
    </div>
  );
}

export default memo(HeartList);
