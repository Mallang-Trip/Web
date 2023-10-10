import { useParams } from "react-router-dom";
import Vector from "../../../assets/images/Vector.png";

function HeadTitle() {
  const { place } = useParams();

  return (
    <>
      <div className="text-2xl text-black">{place}</div>
      <span className="text-sm text-darkgray cursor-pointer">
        <span>{`김제윤 드라이버`}</span>
        <img src={Vector} className="inline-block ml-1.5 mt-[2px]" />
      </span>
    </>
  );
}

export default HeadTitle;
