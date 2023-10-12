import React from "react";
import { useSelector } from "react-redux";
import { makePhoneNumber } from "../../../../utils";

function TravelerInfo() {
  const user = useSelector((state) => state.user);

  return (
    <div className="flex flex-col gap-4 mt-6 text-sm text-darkgray">
      <p>여행자1</p>
      <p>{`예약자 이름: ${user.name}`}</p>
      <p>{`핸드폰 번호: ${makePhoneNumber(user.phoneNumber)}`}</p>
    </div>
  );
}

export default TravelerInfo;
