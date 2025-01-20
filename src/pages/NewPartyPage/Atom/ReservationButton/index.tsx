import { memo, useEffect, useState } from "react";
import { BottomButton } from "@/components";

interface Props {
  joinHandler: () => void;
}

function ReservationButton({ joinHandler }: Props) {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="hidden md:flex justify-center my-20">
        <button
          className="h-14 text-white rounded-full text-lg font-bold w-64 md:w-80 bg-primary"
          onClick={joinHandler}
        >
          일정 가입하기
        </button>
      </div>
      {scrollPosition > 400 && (
        <BottomButton text="일정 가입하기" onClick={joinHandler} />
      )}
    </>
  );
}

export default memo(ReservationButton);
