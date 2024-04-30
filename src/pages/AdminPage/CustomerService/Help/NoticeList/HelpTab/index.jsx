function HelpTab({ helpType, setHelpType }) {
  return (
    <div className="w-full my-10 grid grid-cols-2 rounded-lg border border-primary">
      <button
        className={`h-12 rounded-l-lg border-r border-primary text-sm font-semibold ${helpType === "ANNOUNCEMENT" ? "text-white bg-primary" : "text-primary bg-white"}`}
        onClick={() => setHelpType("ANNOUNCEMENT")}
      >
        공지사항
      </button>
      <button
        className={`h-12 rounded-r-lg text-sm font-semibold ${helpType === "FAQ" ? "text-white bg-primary" : "text-primary bg-white"}`}
        onClick={() => setHelpType("FAQ")}
      >
        FAQ
      </button>
    </div>
  );
}

export default HelpTab;
