import React, { useEffect, useState } from "react";

function Agreement(props) {
  const [allChecked, setAllChecked] = useState(false);
  const [checked, setChecked] = useState([false, false, false, false, false]);

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

    if (checked.slice(0, 3).indexOf(false) < 0) props.setActiveNext(true);
    else props.setActiveNext(false);
  }, [checked, props]);

  return (
    <div className="flex flex-col items-center gap-3 mt-12 text-sm">
      <div className="w-[500px] h-[42px] flex items-center rounded-lg bg-[#EAF4FF]">
        <input
          type="checkbox"
          className="mx-3"
          checked={allChecked}
          onChange={allCheckedHandler}
        />
        <span className="text-primary">전체동의(선택 항목 포함)</span>
      </div>
      <div className="w-[500px] h-[42px] flex items-center rounded-lg">
        <input
          type="checkbox"
          className="mx-3"
          checked={checked[0]}
          onChange={(e) => checkedHandler(e, 0)}
        />
        <span className="text-darkgray">이용약관 동의(필수)</span>
        <span className="mr-3 ml-auto text-[#6F6F6F] text-xs underline underline-offset-2 cursor-pointer">
          전문보기
        </span>
      </div>
      <div className="w-[500px] h-[42px] flex items-center rounded-lg">
        <input
          type="checkbox"
          className="mx-3"
          checked={checked[1]}
          onChange={(e) => checkedHandler(e, 1)}
        />
        <span className="text-darkgray">만 14세 이상 확인(필수)</span>
        <span className="mr-3 ml-auto text-[#6F6F6F] text-xs underline underline-offset-2 cursor-pointer">
          전문보기
        </span>
      </div>
      <div className="w-[500px] h-[42px] flex items-center rounded-lg">
        <input
          type="checkbox"
          className="mx-3"
          checked={checked[2]}
          onChange={(e) => checkedHandler(e, 2)}
        />
        <span className="text-darkgray">개인정보 수집 및 이용 동의(필수)</span>
        <span className="mr-3 ml-auto text-[#6F6F6F] text-xs underline underline-offset-2 cursor-pointer">
          전문보기
        </span>
      </div>
      <div className="w-[500px] h-[42px] flex items-center rounded-lg">
        <input
          type="checkbox"
          className="mx-3"
          checked={checked[3]}
          onChange={(e) => checkedHandler(e, 3)}
        />
        <span className="text-darkgray">마케팅 알림 수신 동의(선택)</span>
        <span className="mr-3 ml-auto text-[#6F6F6F] text-xs underline underline-offset-2 cursor-pointer">
          전문보기
        </span>
      </div>
      <div className="w-[500px] h-[42px] flex items-center rounded-lg">
        <input
          type="checkbox"
          className="mx-3"
          checked={checked[4]}
          onChange={(e) => checkedHandler(e, 4)}
        />
        <span className="text-darkgray">
          위치기반 서비스 이용약관 동의(선택)
        </span>
        <span className="mr-3 ml-auto text-[#6F6F6F] text-xs underline underline-offset-2 cursor-pointer">
          전문보기
        </span>
      </div>
    </div>
  );
}

export default Agreement;
