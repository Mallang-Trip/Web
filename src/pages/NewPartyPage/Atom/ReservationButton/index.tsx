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
import clsx from "clsx";

interface Props {
  partyType: string;
  setPartyType: Dispatch<SetStateAction<string>>;
  joinHandler: () => void;
  disabled?: boolean;
}

function ReservationButton({
  partyType,
  setPartyType,
  joinHandler,
  disabled,
}: Props) {
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
            className={clsx(
              "h-14 rounded-full text-lg font-bold w-64 md:w-80 text-white",
              disabled ? "bg-[#E30000]/30" : "bg-primary"
            )}
            onClick={joinHandler}
            disabled={disabled}
          >
            {disabled ? "예약 신청 불가" : "예약 신청하기"}
          </button>
        </div>
        {scrollPosition > 400 && (
          <BottomButton
            text={disabled ? "예약 신청 불가" : "예약 신청하기"}
            onClick={joinHandler}
            disabled={disabled}
          />
        )}
      </>
    );
  else
    return (
      <PartyTypeButton setPartyType={setPartyType} joinHandler={joinHandler} />
    );
}

export default memo(ReservationButton);
