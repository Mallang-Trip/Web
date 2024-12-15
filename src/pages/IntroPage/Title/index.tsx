import { memo } from "react";
import { useIntersectionObserver } from "../../../hooks";
import clsx from "clsx";

function Title() {
  const [ref, isIntersecting] = useIntersectionObserver<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={clsx(
        "my-40 text-2xl lg:text-4xl text-black text-center font-bold",
        isIntersecting ? "animate-fade-up animate-ease-in" : "opacity-0"
      )}
    >
      버스보다 빠르고, 택시보다 저렴하게.
      <br />
      택시 카풀 여행 플랫폼 말랑트립
    </div>
  );
}

export default memo(Title);
