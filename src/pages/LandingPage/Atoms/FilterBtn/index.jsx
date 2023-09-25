import React from "react";

function FilterBtn(props) {
  return (
    <button className="px-5 py-1 text-sm border border-current rounded-full text-gray hover:bg-primary hover:text-white">
      {props.title}
    </button>
  );
}

export default FilterBtn;
