import { useNavigate } from "react-router-dom";

function Body({ partyId, name, startDate, headcount, capacity, driverName }) {
  const navigation = useNavigate();

  return (
    <div className="w-full py-3 grid grid-cols-4 items-center text-center bg-white border border-gray300 rounded-xl">
      <p
        className="px-1 cursor-pointer"
        onClick={() => navigation(`/admin/party?party_id=${partyId}`)}
      >
        {name}
      </p>
      <p className="px-1 text-gray500 font-medium">
        {startDate.replaceAll("-", ".")}
      </p>
      <div className="flex justify-center items-center gap-1 relative px-1">
        <span className="text-primary">
          {headcount}/{capacity}
        </span>
        <span className="text-gray700">명</span>
      </div>
      <p className="px-1 text-gray500">{driverName}</p>
    </div>
  );
}

export default Body;
