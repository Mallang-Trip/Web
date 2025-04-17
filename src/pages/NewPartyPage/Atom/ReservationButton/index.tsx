import {
  memo,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useMemo,
} from "react";
import { BottomButton } from "@/components";
import PartyTypeButton from "./PartyTypeButton";

interface Props {
  partyType: string;
  setPartyType: Dispatch<SetStateAction<string>>;
  joinHandler: () => void;
}

function ReservationButton({ partyType, setPartyType, joinHandler }: Props) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const isSelectedPartyType = useMemo(() => partyType, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isSelectedPartyType)
    return (
      <>
        <div className="hidden md:flex justify-center my-20">
          <button
            className="h-14 text-white rounded-full text-lg font-bold w-64 md:w-80 bg-primary"
            onClick={joinHandler}
          >
            예약 신청하기
          </button>
        </div>
        {scrollPosition > 400 && (
          <BottomButton text="예약 신청하기" onClick={joinHandler} />
        )}
      </>
    );
  else
    return (
      <PartyTypeButton setPartyType={setPartyType} joinHandler={joinHandler} />
    );
}

export default memo(ReservationButton);
