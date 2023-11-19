function Information({ title, content, modifyMode, onChangeHandler }) {
  if (modifyMode === undefined)
    return (
      <div className="flex justify-between py-4 px-6 rounded-xl bg-[#F4F4F4] text-sm text-darkgray">
        <span>{title}</span>
        <span>{content}</span>
      </div>
    );
  else
    return (
      <div className="flex gap-5 py-4 px-6 rounded-xl whitespace-nowrap bg-[#F4F4F4] text-sm text-darkgray">
        <span>{title}</span>
        <input
          type="text"
          className={`w-full bg-[#F4F4F4] focus:outline-none text-right ${
            modifyMode && "text-primary"
          }`}
          value={content}
          onChange={onChangeHandler}
          disabled={!modifyMode}
        />
      </div>
    );
}

export default Information;
