import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDriverMyInfo } from "../../../../api/driver";

function Account() {
  const navigation = useNavigate();
  const [accountInfo, setAccountInfo] = useState({
    accountHolder: "",
    accountNumber: "",
    bank: "",
  });

  const getMyDriverInfo = useCallback(async () => {
    try {
      const result = await getDriverMyInfo();
      if (result.payload) setAccountInfo(result.payload);
    } catch (e) {
      console.log(e);
      navigation("/", { replace: true });
    }
  }, []);

  useEffect(() => {
    getMyDriverInfo();
  }, []);

  return (
    <div className="w-full h-44 flex flex-col justify-between border border-[#fafafa] bg-white rounded-3xl shadow-lg px-6 py-4">
      <p className="text-xl text-black font-bold">내 계좌 정보</p>
      <p className="flex flex-col justify-end items-end">
        <span className="text-sm text-gray500 font-medium">
          예금주: {accountInfo.accountHolder}
        </span>
        <span className="text-sm text-gray500 font-medium">
          {`${accountInfo.bank} ${accountInfo.accountNumber}`}
        </span>
      </p>
    </div>
  );
}

export default memo(Account);
