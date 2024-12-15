import {
  ChangeEvent,
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import CheckIcon from "../../../assets/svg/agree-check.svg";
import AgreeItem from "./AgreeItem";

interface Props {
  setActiveNext: Dispatch<SetStateAction<boolean>>;
}

function Agreement({ setActiveNext }: Props) {
  const [allChecked, setAllChecked] = useState(false);
  const [checked, setChecked] = useState([false, false, false]);

  const agreementData = useMemo(
    () => [
      {
        id: 0,
        title: "이용약관 동의(필수)",
        url: "/policy/user/service",
      },
      {
        id: 1,
        title: "개인정보 수집 및 이용 동의(필수)",
        url: "/policy/user/privacy",
      },
      {
        id: 2,
        title: "위치기반 서비스 이용약관 동의(선택)",
        url: "/policy/user/location",
      },
    ],
    []
  );

  const allCheckedHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setAllChecked(e.target.checked);
      setChecked(checked.map((_) => e.target.checked));
    },
    [checked]
  );

  const checkedHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>, id: number) => {
      const newChecked = [...checked];
      newChecked[id] = e.target.checked;
      setChecked(newChecked);
    },
    [checked]
  );

  useEffect(() => {
    if (checked.indexOf(false) < 0) setAllChecked(true);
    else setAllChecked(false);

    if (checked.slice(0, 2).indexOf(false) < 0) setActiveNext(true);
    else setActiveNext(false);
  }, [checked]);

  return (
    <div className="flex flex-col items-center gap-3 mt-12 text-sm">
      <div className="w-full max-w-[600px] py-3 rounded-lg bg-skyblue">
        <input
          id="agreeAll"
          type="checkbox"
          className="hidden"
          checked={allChecked}
          onChange={allCheckedHandler}
        />
        <label
          htmlFor="agreeAll"
          className="flex items-center h-full cursor-pointer"
        >
          <div className="relative w-3 h-3 mx-3 border border-darkgray">
            {allChecked && (
              <img src={CheckIcon} className="absolute top-0 left-0 w-3 h-3" />
            )}
          </div>
          <span className="text-primary">전체동의(선택 항목 포함)</span>
        </label>
      </div>
      {agreementData.map((item, index) => (
        <AgreeItem
          key={item.id}
          checked={checked[index]}
          checkedHandler={checkedHandler}
          {...item}
        />
      ))}
    </div>
  );
}

export default memo(Agreement);
