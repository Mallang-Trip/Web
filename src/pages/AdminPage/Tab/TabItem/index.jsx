import React from "react";

function TabItem({ items, onClickCategoryHandler, category }) {
  console.log(items);
  console.log(category);
  return (
    <button
      className={`text-lg py-3 px-1 focus:outline-none whitespace-nowrap${
        category === items ? "text-primary" : "text-black hovertext-primary"
      }`}
      onClick={(e) => onClickCategoryHandler(e)}
    >
      {items}
    </button>
  );
}

export default TabItem;
