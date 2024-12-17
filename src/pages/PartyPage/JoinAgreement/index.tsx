import {
  ChangeEvent,
  Dispatch,
  ForwardedRef,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Check from "@/assets/svg/agree-check.svg";
import AgreeItem from "./AgreeItem";
import clsx from "clsx";

interface Props {
  checked: boolean[];
  setChecked: Dispatch<SetStateAction<boolean[]>>;
  shakeAgree: boolean;
  agreementRef: ForwardedRef<HTMLDivElement>;
}

function JoinAgreement({
  checked,
  setChecked,
  shakeAgree,
  agreementRef,
}: Props) {
  const [allChecked, setAllChecked] = useState(false);
  const [showText, setShowText] = useState(false);

  const agreementData = useMemo(
    () => [
      {
        id: 0,
        title: "말랑트립 서비스 이용약관(일반회원용) (필수)",
        url: "/policy/user/service",
      },
      {
        id: 1,
        title: "말랑트립 개인정보 처리방침(일반회원용) (필수)",
        url: "/policy/user/privacy",
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
  }, [checked]);

  useEffect(() => {
    if (shakeAgree) setShowText(true);
  }, [shakeAgree]);

  useEffect(() => {
    if (allChecked) setShowText(false);
  }, [allChecked]);

  return (
    <div ref={agreementRef} className={clsx(shakeAgree && "animate-shake")}>
      <div className="w-full sm:w-3/5 lg:w-2/5 mx-auto font-bold flex gap-10 items-center">
        <div className="text-lg text-black">필수 약관</div>
        <div
          className={clsx("text-sm", showText ? "text-red-600" : "text-white")}
        >
          필수 약관에 동의해 주세요!
        </div>
      </div>
      <div className="flex flex-col items-center gap-3 mt-8 text-sm">
        <div className="w-full sm:w-3/5 lg:w-2/5 py-3 rounded-lg bg-skyblue">
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
                <img src={Check} className="absolute top-0 left-0 w-3 h-3" />
              )}
            </div>
            <span className="text-primary">전체동의</span>
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
    </div>
  );
}

export default memo(JoinAgreement);
