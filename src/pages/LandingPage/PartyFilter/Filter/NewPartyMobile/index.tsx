import { Dispatch, memo, SetStateAction, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import plusIcon from "@/assets/svg/new-party-plus-mobile.svg";
import leftLogo from "@/assets/svg/new-party-left-mobile.svg";
import rightLogo from "@/assets/svg/new-party-right-mobile.svg";

interface Props {
  setShowLoginModal: Dispatch<SetStateAction<boolean>>;
}

function NewPartyMobile({ setShowLoginModal }: Props) {
  const navigation = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const clickHandler = useCallback(() => {
    if (user.auth)
      navigation(
        `/party/new/1?region=${null}&member=${null}&date=${null}&driverId=${null}`
      );
    else setShowLoginModal(true);
  }, [user]);

  return (
    <button
      className="w-full h-12 flex gap-4 items-center px-4 text-sm text-white font-bold bg-primary rounded-lg relative"
      onClick={clickHandler}
    >
      <div className="w-6 h-6 flex justify-center items-center">
        <img src={plusIcon} alt="나만의 새로운 파티 만들기" />
      </div>
      나만의 새로운 파티 만들기
      <img
        src={leftLogo}
        alt="나만의 새로운 파티 만들기"
        className="absolute top-3 left-3"
      />
      <img
        src={rightLogo}
        alt="나만의 새로운 파티 만들기"
        className="absolute right-1"
      />
    </button>
  );
}

export default memo(NewPartyMobile);
