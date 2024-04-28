import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import img_more_info from "../../../../assets/svg/more-info-gray500.svg";

function ButtonItem({ name, child, id }) {
  const navigation = useNavigate();
  const { type } = useParams();
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    if (!child) return;
    if (child.some((item) => item.id === type)) setShowChild(true);
    else setShowChild(false);
  }, [type]);

  return (
    <div>
      <div
        onClick={() =>
          !child ? navigation(`/admin/${id}`) : setShowChild(!showChild)
        }
        className="flex justify-between w-full h-12 py-4 px-8 items-center gap-2.5 cursor-pointer"
      >
        {type === id ? (
          <div className="text-sm font-bold text-primary">{name}</div>
        ) : (
          <div className="text-sm font-semibold text-[#1C1B1F]">{name}</div>
        )}
        {child && (
          <img
            className={`select-none transition-all duration-300 ${showChild ? "rotate-180" : "rotate-0"}`}
            src={img_more_info}
          />
        )}
      </div>
      {child && (
        <div
          className={`overflow-hidden transition-all duration-300 ${showChild ? "max-h-96" : "max-h-0"}`}
        >
          {child.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                if (item.id === "community") navigation("/community/main");
                else if (item.id === "inquiry") navigation("/talk");
                else navigation(`/admin/${item.id}`);
              }}
              className="flex justify-between w-full h-12 py-4 pl-10 items-center gap-2.5 cursor-pointer bg-[#EAF4FF]"
            >
              {type === item.id ? (
                <div className="text-sm font-bold text-primary">
                  {item.name}
                </div>
              ) : (
                <div className="text-sm font-semibold">{item.name}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ButtonItem;
