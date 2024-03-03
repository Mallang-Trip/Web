import { useNavigate } from "react-router-dom";
import { ReactComponent as Check } from "../../../../assets/svg/agree-check.svg";

function AgreeItem({ checkedHandler, checked, id, title, url }) {
  const navigation = useNavigate();

  return (
    <div className="w-full sm:w-3/5 xl:w-2/5 py-3 rounded-lg">
      <input
        id={`agree${id}`}
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={(e) => checkedHandler(e, id)}
      />
      <div className="flex items-center h-full">
        <label
          htmlFor={`agree${id}`}
          className="flex items-center cursor-pointer"
        >
          <div className="relative w-3 h-3 mx-3 border border-darkgray">
            {checked && <Check className="absolute -top-0.5 -left-0.5" />}
          </div>
          <span className="text-darkgray">{title}</span>
        </label>
        <button
          className="mr-3 ml-auto text-[#6F6F6F] text-xs underline underline-offset-2 whitespace-nowrap"
          onClick={() => navigation(url)}
        >
          전문보기
        </button>
      </div>
    </div>
  );
}

export default AgreeItem;
