import { useState } from "react";
import { makePhoneNumber } from "../../../../utils";

function FriendInfo({ index }) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <div className="flex flex-col gap-2 text-sm text-darkgray font-medium">
      <p>{`여행자 ${index + 2}`}</p>
      <div className="w-full flex gap-2 whitespace-nowrap">
        <span>{"여행자 이름 : "}</span>
        <input
          type="text"
          className={`w-32 focus:outline-none text-primary placeholder:text-primary`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="직접 입력해 주세요."
        />
      </div>
      <div className="w-full flex gap-2 whitespace-nowrap">
        <span>{"핸드폰 번호 : "}</span>
        <input
          type="text"
          className={`w-32 focus:outline-none text-primary placeholder:text-primary`}
          value={makePhoneNumber(phoneNumber)}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="직접 입력해 주세요."
        />
      </div>
    </div>
  );
}

export default FriendInfo;
