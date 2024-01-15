import { useEffect, useState } from "react";
import { ReactComponent as Check } from "../../../../assets/svg/agree-check.svg";
import ItemAgree from "./ItemAgree";

const agreementData = [
  {
    id: 0,
    title: "개인정보 수집 및 이용(필수)",
  },
  {
    id: 1,
    title: "개인정보 제3자 제공(필수)",
  },
];

function AddAgree({ checked, setChecked, shakeAgree }) {
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
    <>
      <div className="mb-4 text-2xl text-black font-bold">필수 약관</div>
      <div
        className={`flex flex-col items-center gap-3 text-sm ${
          shakeAgree && "animate-shake"
        }`}
      >
        <div className="w-4/5 sm:w-3/5 lg:w-2/5 h-[42px] rounded-lg bg-[#EAF4FF]">
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
        {agreementData.map((item) => (
          <ItemAgree
            key={item.id}
            checked={checked[item.id]}
            checkedHandler={checkedHandler}
            index={item.id}
            title={item.title}
          />
        ))}
      </div>
      <p
        className={`${
          showText ? "text-[#FF0000]" : "text-white"
        } text-sm text-center mt-1`}
      >
        필수 약관에 동의해 주세요!
      </p>
    </>
  );
}

export default AddAgree;
