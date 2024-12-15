import { memo, useEffect, useMemo, useState } from "react";
import BottomButton from "../../../components/BottomButton";

interface Props {
  courseId: string;
  saveHandler: () => void;
}

function SaveButton({ courseId, saveHandler }: Props) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const label = useMemo(
    () => (courseId === "new" ? "등록하기" : "저장하기"),
    [courseId]
  );

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
      <div className="hidden md:flex justify-center mt-20">
        <button
          className="h-14 text-white rounded-full text-lg font-bold w-80 bg-primary border border-primary"
          onClick={saveHandler}
        >
          {label}
        </button>
      </div>
      {scrollPosition > 300 && (
        <BottomButton text={label} onClick={saveHandler} />
      )}
    </>
  );
}

export default memo(SaveButton);
