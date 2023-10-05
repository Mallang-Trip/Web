import React from "react";

function FilterBtn({ title, filterItem, setFilterItem }) {
  return (
    <button
      className={`px-5 py-1 text-sm border border-current rounded-full hover:bg-primary hover:text-white ${
        title === filterItem ? "text-white bg-primary" : "text-darkgray"
      }`}
      onClick={() => setFilterItem(title)}
    >
      {title}
    </button>
  );
}

export default FilterBtn;
