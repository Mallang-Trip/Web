import React, { useEffect, useState } from "react";
import { ReactComponent as Check } from "../../../assets/svg/agree-check.svg";
import ItemAgree from "./ItemAgree";

import AgreeItem from "../../SignupPage/AgreeItem";
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
function AddAgree(props) {
  const [allChecked, setAllChecked] = useState(false);
  const [checked, setChecked] = useState([false, false]);

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

    /*if (checked.slice(0, 3).indexOf(false) < 0) props.setActiveNext(true);
    else props.setActiveNext(false);*/
  }, [checked, props]);

  return (
    <div className="flex flex-col items-center gap-3 mt-12 text-sm">
      <div className="w-[500px] h-[42px] rounded-lg bg-[#EAF4FF]">
        <input
          id="agreeAll"
          type="checkbox"
          className="hidden"
          checked={allChecked}
          onChange={allCheckedHandler}
        />
        <label htmlFor="agreeAll" className="flex items-center h-full">
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
  );
}

export default AddAgree;
