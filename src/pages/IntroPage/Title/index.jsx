import { useRef } from "react";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";

function Title() {
  const titleRef = useRef();
  const viewTitle = useIntersectionObserver(titleRef);

  return (
    <div
      ref={titleRef}
      id="title"
      className={`mt-40 mb-10 text-2xl md:text-4xl text-black text-center font-bold ${
        viewTitle ? "animate-fade-up animate-ease-in" : "opacity-0"
      }`}
    >
      버스보다 빠르고, 택시보다 저렴하게.
      <br />
      택시 카풀 여행 플랫폼 말랑트립
    </div>
  );
}

export default Title;
