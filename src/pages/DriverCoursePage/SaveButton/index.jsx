import { useEffect, useState } from "react";
import BottomButton from "../../../components/BottomButton";

function SaveButton({ courseId, saveHandler }) {
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
      <div className="hidden md:flex justify-center mt-20">
        <button
          className="h-14 text-white rounded-full text-lg font-bold w-64 md:w-80 bg-primary"
          onClick={saveHandler}
        >
          {courseId === "new" ? "등록하기" : "수정하기"}
        </button>
      </div>
      {scrollPosition > 300 && (
        <BottomButton
          text={courseId === "new" ? "등록하기" : "수정하기"}
          onClick={saveHandler}
        />
      )}
    </>
  );
}

export default SaveButton;
