import {
  ChangeEvent,
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
} from "react";
import { DriverInfo } from "@/types";
import DriverIntroduction from "./DriverIntroduction";

interface Props {
  modifyMode: boolean;
  driverInfo: DriverInfo;
  setDriverInfo: Dispatch<SetStateAction<DriverInfo>>;
}

function Introduction({ modifyMode, driverInfo, setDriverInfo }: Props) {
  const onChangeHandler = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setDriverInfo({
        ...driverInfo,
        introduction: event.target.value.slice(0, 300),
      });
    },
    [driverInfo]
  );

  return (
    <>
      <p className="text-lg font-bold text-black mt-12 mb-5">
        드라이버 자기소개
      </p>
      <div>
        <DriverIntroduction
          modifyMode={modifyMode}
          content={driverInfo.introduction}
          onChangeHandler={onChangeHandler}
        />
      </div>
    </>
  );
}

export default memo(Introduction);
