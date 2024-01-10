import { priceToString } from "../../../utils";

function ToTalPrice({ totalPrice }) {
  return (
    <div className="flex flex-col gap-1 my-7">
      <p className="text-lg text-black font-bold">전체 파티 여행비</p>
      <p className="text-sm text-darkgray">{`${priceToString(
        totalPrice
      )}원`}</p>
    </div>
  );
}

export default ToTalPrice;
