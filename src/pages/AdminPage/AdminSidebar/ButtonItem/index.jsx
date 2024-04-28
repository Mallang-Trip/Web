import { useState } from "react";
import { useNavigate } from "react-router-dom";
import img_more_info from "../../../../assets/svg/more-info-gray500.svg";
import img_more_info_close from "../../../../assets/svg/more-info-gray500-close.svg";

function ButtonItem({ name, child, id, current, changeCurrent }) {
  const navigation = useNavigate();
  const [showChild, setShowChild] = useState(false);

  return (
    <div>
      <div
        onClick={() => {
          changeCurrent(id);
          {
            !child ? navigation(`/admin/${id}`) : setShowChild(!showChild);
          }
        }}
        className="flex justify-between w-full h-12 py-4 px-8 items-center gap-2.5 cursor-pointer"
      >
        {current === id ? (
          <div className="text-sm font-bold text-primary">{name}</div>
        ) : (
          <div className="text-sm font-semibold text-[#1C1B1F]">{name}</div>
        )}
        {child && (
          <div>
            {showChild ? (
              <img className="select-none" src={img_more_info_close} />
            ) : (
              <img className="select-none" src={img_more_info} />
            )}
          </div>
        )}
      </div>
      {child && showChild && (
        <div>
          {child.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                changeCurrent(item.id);
                navigation(`/admin/${item.id}`);
              }}
              className="flex justify-between w-full h-12 py-4 pl-10 items-center gap-2.5 cursor-pointer bg-[#EAF4FF]"
            >
              {current === item.id ? (
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
