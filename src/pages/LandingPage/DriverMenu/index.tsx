import { Dispatch, memo, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import clsx from "clsx";

interface Props {
  driverMenu: "driver" | "user";
  setDriverMenu: Dispatch<SetStateAction<"driver" | "user">>;
}

function DriverMenu({ driverMenu, setDriverMenu }: Props) {
  const user = useSelector((state: RootState) => state.user);

  if (user.role !== "ROLE_DRIVER") return null;
  return (
    <div className="flex justify-start gap-6 mb-6 max-w-screen-xl mx-auto px-2 md:px-5">
      <button
        className={clsx(
          "text-2xl font-bold transition-all duration-500",
          driverMenu === "driver" ? "text-gray800" : "text-gray400"
        )}
        onClick={() => setDriverMenu("driver")}
      >
        드라이버 홈
      </button>
      <button
        className={clsx(
          "text-2xl font-bold transition-all duration-500",
          driverMenu === "user" ? "text-gray800" : "text-gray400"
        )}
        onClick={() => setDriverMenu("user")}
      >
        여행자 홈
      </button>
    </div>
  );
}

export default memo(DriverMenu);
