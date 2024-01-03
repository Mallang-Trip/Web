import { priceToString } from "../../../../utils";

function ToTalCredit({ totalPrice }) {
  return (
    <div className="pb-6">
      <p className="text-lg font-bold">전체 파티 여행비</p>
      <p className="text-sm text-darkgray">{`${priceToString(
        totalPrice
      )}원`}</p>
    </div>
  );
}

export default ToTalCredit;
