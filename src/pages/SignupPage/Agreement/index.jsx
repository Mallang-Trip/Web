import { useEffect, useState } from "react";
import { ReactComponent as Check } from "../../../assets/svg/agree-check.svg";
import AgreeItem from "./AgreeItem";

const agreementData = [
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
];

function Agreement({ setActiveNext }) {
  const [allChecked, setAllChecked] = useState(false);
  const [checked, setChecked] = useState([false, false, false]);

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

    if (checked.slice(0, 2).indexOf(false) < 0) setActiveNext(true);
    else setActiveNext(false);
  }, [checked]);

  return (
    <div className="flex flex-col items-center gap-3 mt-12 text-sm">
      <div className="w-4/5 sm:w-3/5 lg:w-2/5 py-3 rounded-lg bg-[#EAF4FF]">
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

export default Agreement;
