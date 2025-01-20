import { Dispatch, memo, SetStateAction, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import mallangtripLogo from "@/assets/svg/mallangtrip-logo-grey.svg";

interface Props {
  setShowLoginModal: Dispatch<SetStateAction<boolean>>;
}

function NewMyParty({ setShowLoginModal }: Props) {
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
    <div className="hidden md:block w-full mb-8 bg-skyblue py-7">
      <div className="max-w-screen-xl mx-auto px-8 flex justify-between items-center">
        <div className="flex flex-col gap-3">
          <p className="text-lg text-black font-bold">
            나만의 특별한 일정을 만들어보세요!
          </p>
          <p className="text-sm text-black font-normal">
            나만의 여행 코스를 만들어 더욱 특별한 여행을 경험해보세요.
            <br />
            독점 예약으로 혼자 또는 사랑하는 사람들과만 여행을 떠날 수 있습니다.
          </p>
        </div>
        <button
          className="py-4 px-8 bg-primary text-sm text-white font-bold whitespace-nowrap rounded-[10px] relative"
          onClick={clickHandler}
        >
          <img
            src={mallangtripLogo}
            alt="나만의 새로운 일정 만들기"
            className="absolute top-3 left-3"
          />
          나만의 새로운 일정 만들기
        </button>
      </div>
    </div>
  );
}

export default memo(NewMyParty);
