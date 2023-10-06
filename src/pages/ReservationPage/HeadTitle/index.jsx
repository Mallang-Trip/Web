import { useParams } from "react-router-dom";
import Vector from "../../assets/images/Vector.png";

function HeadTitle() {
  const { place } = useParams();

  return (
    <>
      <div className="text-2xl text-black font-bold mb-2">예약하기</div>
      <div className="text-2xl text-black">{place}</div>
      <div className="text-sm text-darkgray cursor-pointer">
        <span>{`김제윤 드라이버`}</span>
        <img src={Vector} className="inline-block ml-1.5 mt-[2px]" />
      </div>
      <div className="text-sm text-darkgray mt-1">2023년 4월 1일~2일</div>
    </>
  );
}

export default HeadTitle;
