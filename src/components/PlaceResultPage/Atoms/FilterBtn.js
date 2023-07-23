import React from "react";

function FilterBtn(props) {
  return (
    <div>
      <button className="rounded-full border border-current pl-4 pr-4 pt-0.5 pb-0.5 text-xs hover:bg-primary hover:text-white text-gray-500">
        {props.title}
      </button>
    </div>
  );
}

export default FilterBtn;
