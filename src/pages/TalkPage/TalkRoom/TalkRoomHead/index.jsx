import { RxHamburgerMenu } from "react-icons/rx";
import headerBack from "../../../../assets/svg/header-back.svg";

function TalkRoomHead({ closeRoomHandler, name }) {
  return (
    <div className="flex justify-between pl-1 pt-3 pb-2 h-16 border-b border-solid border-[#D9D9D9]">
      <button
        className="flex gap-2 items-center focus:outline-none"
        onClick={closeRoomHandler}
      >
        <img src={headerBack} alt="back" className="w-5 h-5" />
        <span className="text-lg text-black font-bold">{name}</span>
      </button>
      <button className="focus:outline-none">
        <RxHamburgerMenu className="text-2xl mr-3" />
      </button>
    </div>
  );
}

export default TalkRoomHead;
