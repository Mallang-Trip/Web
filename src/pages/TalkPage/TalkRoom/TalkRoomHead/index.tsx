import { Dispatch, memo, SetStateAction } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import headerBack from "@/assets/svg/header-back.svg";

interface Props {
  closeRoomHandler: () => void;
  name: string;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}

function TalkRoomHead({ closeRoomHandler, name, setShowMenu }: Props) {
  return (
    <div className="flex justify-between pl-1 pt-3 pb-2 h-16 border-b border-solid border-mediumgray">
      <div className="flex gap-1 items-center">
        <button
          className="p-1 rounded-lg focus:outline-none hover:bg-darkgray/10"
          onClick={closeRoomHandler}
        >
          <img src={headerBack} alt="뒤로가기" className="w-5 h-5" />
        </button>
        <span className="text-lg text-black font-bold">{name}</span>
      </div>

      <button className="focus:outline-none" onClick={() => setShowMenu(true)}>
        <RxHamburgerMenu className="text-2xl mr-3" />
      </button>
    </div>
  );
}

export default memo(TalkRoomHead);
