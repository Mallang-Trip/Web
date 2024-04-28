import { useNavigate } from "react-router-dom";
import { priceToString } from "../../../../../../utils";

function Body({
  partyId,
  name,
  startDate,
  headcount,
  capacity,
  driverName,
  price,
}) {
  const navigation = useNavigate();

  return (
    <div className="w-full py-3 grid grid-cols-5 items-center text-center bg-white border border-gray300 rounded-xl">
      <p
        className="px-1 cursor-pointer"
        onClick={() => navigation(`/admin/party?party_id=${partyId}`)}
      >
        {name}
      </p>
      <p className="px-1 text-gray500 font-medium">
        {startDate.replaceAll("-", ".")}
      </p>
      <p className="px-1 text-gray500 font-medium">
        {headcount}/{capacity} 명
      </p>
      <p className="px-1 text-primary">{priceToString(price * capacity)} 원</p>
      <p className="px-1 text-gray500">{driverName}</p>
    </div>
  );
}

export default Body;
