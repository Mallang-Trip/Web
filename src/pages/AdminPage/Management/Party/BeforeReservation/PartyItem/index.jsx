import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { customRoundOne, dateToStringHan } from "../../../../../../utils";

function PartyItem({
  partyId,
  image,
  name,
  startDate,
  headcount,
  capacity,
  price,
  driverName,
  promotion,
}) {
  const navigation = useNavigate();

  return (
    <div
      className="w-full h-64 relative cursor-pointer rounded-lg"
      onClick={() => navigation(`/admin/party?party_id=${partyId}`)}
    >
      <img
        className="absolute top-0 left-0 object-cover object-center w-full h-full overflow-hidden rounded-lg"
        src={image}
        alt={name}
      />
      <div className="z-10 bg-black bg-opacity-30 w-full h-full flex justify-center items-center rounded-lg absolute top-0 left-0">
        <div className="text-center text-white flex flex-col gap-1.5">
          <p className="text-xl font-bold">{name}</p>
          <p className="text-sm font-medium">{`${dateToStringHan(
            startDate
          )} | ${headcount}/${capacity}명 | ${customRoundOne(
            (price * capacity) / 10000
          )}만원 | ${driverName} 드라이버`}</p>
          {promotion && (
            <p className="text-white text-base font-bold">프로모션 코드 적용</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(PartyItem);
