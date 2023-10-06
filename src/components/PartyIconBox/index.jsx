import Heart from "../../assets/svg/EmptyHeart.svg";
import ChatBox from "../../assets/svg/EmptyChatIcon.svg";
import shareIcon from "../../assets/svg/share.svg";

function PartyIconBox() {
  return (
    <div className="flex gap-2 justify-end mr-1.5 mt-2 mb-4">
      <img className="cursor-pointer" src={ChatBox} />
      <img className="cursor-pointer" src={Heart} />
      <img className="cursor-pointer" src={shareIcon} />
    </div>
  );
}

export default PartyIconBox;
