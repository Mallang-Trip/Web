import { ChangeEvent, memo } from "react";
import { useNavigate } from "react-router-dom";
import Check from "@/assets/svg/agree-check.svg";

interface Props {
  checkedHandler: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
  checked: boolean;
  id: number;
  title: string;
  url: string;
}

function AgreeItem({ checkedHandler, checked, id, title, url }: Props) {
  const navigation = useNavigate();

  return (
    <div className="w-full sm:w-3/5 lg:w-2/5 py-3 rounded-lg">
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
            {checked && (
              <img src={Check} className="absolute top-0 left-0 w-3 h-3" />
            )}
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

export default memo(AgreeItem);
