import { memo, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { BottomButton } from "@/components";

interface Props {
  joinHandler: () => void;
  partyStatus: string;
}

function JoinButton({ joinHandler, partyStatus }: Props) {
  const user = useSelector((state: RootState) => state.user);
  const { type } = useParams();
  const [scrollPosition, setScrollPosition] = useState(0);

  const buttonText = useMemo(
    () => ({
      detail: "일정 가입하기",
      join: "가입 완료하기",
      edit: "제안 보내기",
    }),
    []
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

  if (user.role === "ROLE_DRIVER" || partyStatus !== "RECRUITING") return null;
  if (type !== "detail" && type !== "join" && type !== "edit") return null;
  return (
    <>
      <div className="hidden md:flex justify-center mt-20">
        <button
          className="h-14 text-white rounded-full text-lg font-bold w-64 md:w-80 bg-primary"
          onClick={joinHandler}
        >
          {buttonText[type]}
        </button>
      </div>
      {scrollPosition > 300 && (
        <BottomButton text={buttonText[type]} onClick={joinHandler} />
      )}
    </>
  );
}

export default memo(JoinButton);
