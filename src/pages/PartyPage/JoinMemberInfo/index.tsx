import {
  Dispatch,
  ForwardedRef,
  memo,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import MyInfo from "./MyInfo";
import FriendInfo from "./FriendInfo";
import clsx from "clsx";

interface Props {
  companionsRef: ForwardedRef<HTMLDivElement>;
  memberCount: number;
  companions: { name: string; phoneNumber: string }[];
  setCompanions: Dispatch<
    SetStateAction<{ name: string; phoneNumber: string }[]>
  >;
  shakeCompanions: boolean;
}

function JoinMemberInfo({
  companionsRef,
  memberCount,
  companions,
  setCompanions,
  shakeCompanions,
}: Props) {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (shakeCompanions) setShowText(true);
  }, [shakeCompanions]);

  return (
    <div
      className={clsx(
        "my-7 flex flex-col gap-6",
        shakeCompanions && "animate-shake"
      )}
      ref={companionsRef}
    >
      <div className="w-full flex gap-5 items-center font-bold">
        <p className="text-lg text-black">여행자 정보</p>
        <div
          className={clsx("text-sm", showText ? "text-red-600" : "text-white")}
        >
          동행자 정보를 모두 입력해주세요.
        </div>
      </div>
      <MyInfo />
      {Array.apply(null, new Array(memberCount - 1)).map((_, index) => (
        <FriendInfo
          key={index}
          index={index}
          companions={companions}
          setCompanions={setCompanions}
        />
      ))}
    </div>
  );
}

export default memo(JoinMemberInfo);
