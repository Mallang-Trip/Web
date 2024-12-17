import {
  ChangeEvent,
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
} from "react";
import { makePhoneNumber } from "@/utils";

interface Props {
  index: number;
  companions: { name: string; phoneNumber: string }[];
  setCompanions: Dispatch<
    SetStateAction<{ name: string; phoneNumber: string }[]>
  >;
}

function FriendInfo({ index, companions, setCompanions }: Props) {
  const nameHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const tempCompanions = [...companions];
      tempCompanions[index].name = e.target.value;
      setCompanions(tempCompanions);
    },
    [companions, index]
  );

  const phoneNumberHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const tempCompanions = [...companions];
      tempCompanions[index].phoneNumber = e.target.value;
      setCompanions(tempCompanions);
    },
    [companions, index]
  );

  return (
    <div className="flex flex-col gap-2 text-sm text-darkgray font-medium">
      <p>{`여행자 ${index + 2}`}</p>
      <div className="w-full flex gap-2 whitespace-nowrap">
        <span>{"여행자 이름 : "}</span>
        <input
          type="text"
          className="w-32 focus:outline-none text-primary placeholder:text-primary"
          value={companions[index].name}
          onChange={nameHandler}
          placeholder="직접 입력해 주세요."
        />
      </div>
      <div className="w-full flex gap-2 whitespace-nowrap">
        <span>{"핸드폰 번호 : "}</span>
        <input
          type="text"
          className="w-32 focus:outline-none text-primary placeholder:text-primary"
          value={makePhoneNumber(companions[index].phoneNumber)}
          onChange={phoneNumberHandler}
          placeholder="직접 입력해 주세요."
        />
      </div>
    </div>
  );
}

export default memo(FriendInfo);
