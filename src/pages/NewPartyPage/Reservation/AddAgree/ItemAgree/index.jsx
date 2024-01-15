import { ReactComponent as Check } from "../../../../../assets/svg/agree-check.svg";

function ItemAgree({ index, checked, checkedHandler, title }) {
  return (
    <div className="w-4/5 sm:w-3/5 lg:w-2/5 h-[42px] rounded-lg">
      <input
        id={`agree${index}`}
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={(e) => checkedHandler(e, index)}
      />
      <div className="flex items-center h-full">
        <label
          htmlFor={`agree${index}`}
          className="flex items-center cursor-pointer"
        >
          <div className="relative w-3 h-3 mx-3 border border-darkgray">
            {checked && <Check className="absolute -top-0.5 -left-0.5" />}
          </div>
          <span className="text-darkgray">{title}</span>
        </label>
        <span className="mr-3 ml-auto text-[#6F6F6F] text-xs underline underline-offset-2 cursor-pointer">
          보기
        </span>
      </div>
    </div>
  );
}

export default ItemAgree;
