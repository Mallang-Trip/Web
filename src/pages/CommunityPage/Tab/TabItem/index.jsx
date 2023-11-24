function TabItem({ item, category, categoryClickHandler }) {
  return (
    <button
      className={`text-sm py-3 px-1 focus:outline-none ${
        category === item ? "text-primary" : "text-black hover:text-primary"
      }`}
      onClick={(e) => categoryClickHandler(e)}
    >
      {item}
    </button>
  );
}

export default TabItem;
