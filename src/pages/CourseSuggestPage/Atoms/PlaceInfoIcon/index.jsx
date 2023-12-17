import Heart from "../../../../assets/svg/EmptyHeart.svg";
import shareIcon from "../../../../assets/svg/share.svg";

function PlaceInfoIcon() {
  return (
    <div className="flex gap-1.5 mr-2">
      <img className="cursor-pointer" src={Heart} />
      <img className="cursor-pointer" src={shareIcon} />
    </div>
  );
}

export default PlaceInfoIcon;
