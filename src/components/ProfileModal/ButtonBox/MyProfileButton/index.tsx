import { Dispatch, memo, SetStateAction, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

function MyProfileButton({ setShowModal }: Props) {
  const navigation = useNavigate();

  const clickHandler = useCallback(() => {
    setShowModal(false);
    navigation("/my/profile");
  }, []);

  return (
    <div className="flex justify-center mb-12 mx-8">
      <button
        className="w-full rounded-full py-2 border border-primary text-base text-primary bg-skyblue"
        onClick={clickHandler}
      >
        나의 프로필
      </button>
    </div>
  );
}

export default memo(MyProfileButton);
