import React, { useState } from "react";
import { makePhoneNumber } from "../../../../utils";

function TravelerInput() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <div className="flex flex-col gap-4 mt-6 text-sm text-darkgray">
      <p>여행자2</p>
      <div className="w-full flex gap-2 whitespace-nowrap">
        <span>{"예약자 이름: "}</span>
        <input
          type="text"
          className={`w-full focus:outline-none text-primary placeholder:text-primary`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="직접 입력하세요"
        />
      </div>
      <div className="w-full flex gap-2 whitespace-nowrap">
        <span>{"핸드폰 번호: "}</span>
        <input
          type="text"
          className={`w-full focus:outline-none text-primary placeholder:text-primary`}
          value={makePhoneNumber(phoneNumber)}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="직접 입력하세요"
        />
      </div>
    </div>
  );
}

export default TravelerInput;
