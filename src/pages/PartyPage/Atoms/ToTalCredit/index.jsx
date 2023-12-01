import React from "react";
import { priceToString } from "../../../../utils";

function ToTalCredit({ totalPrice }) {
  return (
    <div className="pb-6">
      <p className="text-2xl font-bold">전체 파티 여행비</p>
      <p className="text-xl text-darkgray">{`${priceToString(
        totalPrice
      )}원`}</p>
    </div>
  );
}

export default ToTalCredit;
