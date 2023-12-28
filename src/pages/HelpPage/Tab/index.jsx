function Tab({ type, setType }) {
  return (
    <div className="w-full flex my-9">
      <button
        className={`w-full h-12 rounded-l-lg ${
          type === "notice"
            ? "bg-primary text-white"
            : "bg-white text-primary border border-primary"
        }`}
        onClick={() => setType("notice")}
      >
        공지사항
      </button>
      <button
        className={`w-full h-12 rounded-r-lg ${
          type === "faq"
            ? "bg-primary text-white"
            : "bg-white text-primary border border-primary"
        }`}
        onClick={() => setType("faq")}
      >
        FAQ
      </button>
    </div>
  );
}

export default Tab;
