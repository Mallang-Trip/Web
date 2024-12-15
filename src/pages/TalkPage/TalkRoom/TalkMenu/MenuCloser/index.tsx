import { Dispatch, memo, SetStateAction } from "react";
import closeIcon from "../../../../../assets/svg/x-modal-icon.svg";

interface Props {
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}

function MenuCloser({ setShowMenu }: Props) {
  return (
    <img
      src={closeIcon}
      alt="닫기"
      className="absolute top-6 right-6 cursor-pointer rounded hover:bg-gray-200"
      onClick={() => setShowMenu(false)}
    />
  );
}

export default memo(MenuCloser);
