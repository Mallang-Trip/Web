import React from "react";

function TabItem({ items, onClickCategoryHandler, category }) {
  return (
    <button
      className={`border m-3 text-xl py-3 px-4 focus:outline-none whitespace-nowrap ${
        category === items ? "text-primary" : "text-black hover:text-primary"
      }`}
      onClick={(e) => onClickCategoryHandler(e)}
    >
      {items}
    </button>
  );
}

export default TabItem;
