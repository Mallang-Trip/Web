import { memo } from "react";
import clsx from "clsx";
import loadingSpinner from "@/assets/images/loading.gif";

interface Props {
  full: boolean;
}

function Loading({ full }: Props) {
  return (
    <>
      <div
        className={clsx("w-full flex justify-center items-center bg-white", {
          "fixed top-0 left-0 h-real-screen": full,
          "my-10": !full,
        })}
      >
        <img src={loadingSpinner} alt="loading..." className="w-24 h-24" />
      </div>
      <div className={clsx(full ? "h-real-screen" : "hidden")} />
    </>
  );
}

export default memo(Loading);
