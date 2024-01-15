import React from "react";

function TabItem({ items, onClickCategoryHandler, category }) {
  console.log(items);
  console.log(category);
  return (
    <button
      className={`text-xl py-3 px-4 focus:outline-none whitespace-nowrap ${
        category === items ? "text-primary" : "text-black hover:text-primary"
      }`}
      onClick={(e) => onClickCategoryHandler(e)}
    >
      {items}
    </button>
  );
}

export default TabItem;
