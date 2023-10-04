import LeftBigPicture from "../Atoms/LeftBigPicture";
import RightPicture from "../Atoms/RightPicture";
import jeju from "../../../assets/images/제주도 이미지 3.jpg";

function PartyBigBox() {
  return (
    <div className="grid grid-cols-2 mt-2">
      <LeftBigPicture src={jeju} name={"제주도"} />
      <RightPicture src={jeju} name={"제주도"} />
    </div>
  );
}

export default PartyBigBox;
