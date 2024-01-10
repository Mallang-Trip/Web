import { useEffect, useState } from "react";
import { ReactComponent as Check } from "../../../assets/svg/agree-check.svg";
import AgreeItem from "./AgreeItem";

const agreementData = [
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
];

function JoinAgreement({ checked, setChecked, shakeAgree, agreementRef }) {
  const [allChecked, setAllChecked] = useState(false);
  const [showText, setShowText] = useState(false);

  const allCheckedHandler = (e) => {
    setAllChecked(e.target.checked);
    setChecked(checked.map((_) => e.target.checked));
  };

  const checkedHandler = (e, num) => {
    const newChecked = [...checked];
    newChecked[num] = e.target.checked;
    setChecked(newChecked);
  };

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
    <div ref={agreementRef} className={`${shakeAgree && "animate-shake"}`}>
      <div className="w-full sm:w-3/5 lg:w-2/5 mx-auto text-2xl text-black font-bold flex justify-between">
        <div className="w-full">필수 약관</div>
        <div
          className={`${
            showText ? "text-red-600" : "text-white"
          } w-full text-sm mt-1`}
        >
          필수 약관에 동의해 주세요!
        </div>
      </div>
      <div className="flex flex-col items-center gap-3 mt-8 text-sm">
        <div className="w-full sm:w-3/5 lg:w-2/5 py-3 rounded-lg bg-[#EAF4FF]">
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
              {allChecked && <Check className="absolute -top-0.5 -left-0.5" />}
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

export default JoinAgreement;
