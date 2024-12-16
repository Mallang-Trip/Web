import { memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { makePhoneNumber } from "../../../../utils";

function MyInfo() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="flex flex-col gap-2 text-sm text-darkgray font-medium">
      <p>여행자 1</p>
      <p>{`여행자 이름 : ${user.name}`}</p>
      <p>{`핸드폰 번호 : ${makePhoneNumber(user.phoneNumber)}`}</p>
    </div>
  );
}

export default memo(MyInfo);
