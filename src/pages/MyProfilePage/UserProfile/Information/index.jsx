function Information({
  title,
  content,
  modifyMode,
  onChangeHandler,
  onClick,
  subString,
}) {
  if (modifyMode === undefined)
    return (
      <div className="flex justify-between py-4 px-6 rounded-xl bg-lightgray text-sm text-darkgray">
        <span>{title}</span>
        <span>{Array.isArray(content) ? content.join(" ") : content}</span>
      </div>
    );
  else
    return (
      <div
        className={`flex gap-5 py-4 px-6 rounded-xl whitespace-nowrap text-sm ${
          modifyMode ? "text-primary bg-skyblue" : "text-darkgray bg-lightgray"
        } ${modifyMode && onClick && "cursor-pointer"}`}
        onClick={onClick}
      >
        <span>{title}</span>
        <div className="w-full flex">
          <input
            type="text"
            className={`w-full focus:outline-none text-right ${
              modifyMode ? "bg-skyblue" : "bg-lightgray"
            } ${modifyMode && onClick && "cursor-pointer caret-transparent"}`}
            value={Array.isArray(content) ? content.join(" ") : content}
            onChange={onChangeHandler}
            disabled={!modifyMode}
          />
          {subString && <span>{subString}</span>}
        </div>
      </div>
    );
}

export default Information;
