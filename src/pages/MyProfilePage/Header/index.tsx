import { Dispatch, memo, SetStateAction, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import info from "@/assets/svg/more-info-black.svg";
import basicProfileImage from "@/assets/images/profileImage.png";
import clsx from "clsx";

interface Props {
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
}

function Header({ category, setCategory }: Props) {
  const user = useSelector((state: RootState) => state.user);
  const [showToggle, setShowToggle] = useState(false);

  const changeHandler = useCallback((category: string) => {
    setShowToggle(false);
    setCategory(category);
  }, []);

  if (user.role !== "ROLE_DRIVER")
    return <p className="mb-9 text-2xl font-bold text-black">나의 프로필</p>;
  else
    return (
      <div className="relative">
        <button
          className="text-2xl font-bold text-black flex gap-2 items-center focus:outline-none"
          onClick={() => setShowToggle(!showToggle)}
        >
          <span>{category}</span>
          <img
            src={info}
            className={clsx(
              "transition-transform duration-500",
              showToggle ? "rotate-180" : "rotate-0"
            )}
          />
        </button>
        <div
          className={clsx(
            "absolute top-10 left-0 w-40 z-10 rounded-xl bg-white text-xs shadow-sm transition-all duration-500 overflow-hidden",
            showToggle ? "max-h-40 border border-mediumgray" : "max-h-0"
          )}
        >
          <button
            className={clsx(
              "w-full p-2.5 flex items-center rounded-t-xl",
              category === "드라이버 프로필" && "bg-skyblue"
            )}
            onClick={() => changeHandler("드라이버 프로필")}
          >
            <img
              src={user.profileImg || basicProfileImage}
              alt="driver_profile"
              className="w-8 h-8 rounded-full mr-2.5"
            />
            <span>드라이버 프로필</span>
          </button>
          <button
            className={clsx(
              "w-full p-2.5 flex items-center rounded-b-xl",
              category === "여행자 프로필" && "bg-skyblue"
            )}
            onClick={() => changeHandler("여행자 프로필")}
          >
            <img
              src={user.profileImg || basicProfileImage}
              alt="driver_profile"
              className="w-8 h-8 rounded-full mr-2.5"
            />
            <span>여행자 프로필</span>
          </button>
        </div>
      </div>
    );
}

export default memo(Header);
