import React from "react";
import { ReactComponent as Check } from "../../../assets/svg/agree-check.svg";

function AgreeItem(props) {
  return (
    <div className="w-4/5 sm:w-3/5 lg:w-2/5 py-3 rounded-lg">
      <input
        id={`agree${props.index}`}
        type="checkbox"
        className="hidden"
        checked={props.checked}
        onChange={(e) => props.checkedHandler(e, props.index)}
      />
      <div className="flex items-center h-full">
        <label
          htmlFor={`agree${props.index}`}
          className="flex items-center cursor-pointer"
        >
          <div className="relative w-3 h-3 mx-3 border border-darkgray">
            {props.checked && <Check className="absolute -top-0.5 -left-0.5" />}
          </div>
          <span className="text-darkgray">{props.title}</span>
        </label>
        <span className="mr-3 ml-auto text-[#6F6F6F] text-xs underline underline-offset-2 cursor-pointer whitespace-nowrap">
          전문보기
        </span>
      </div>
    </div>
  );
}

export default AgreeItem;
