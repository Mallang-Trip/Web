import { useNavigate } from "react-router-dom";

function PartyItem({ party }) {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`/party/${party.partyId}`);
  };

  return (
    <div className="relative h-64 cursor-pointer" onClick={onClickHandler}>
      <img
        className="absolute top-0 left-0 object-cover object-center w-full h-full overflow-hidden rounded-lg"
        src={party.image}
        alt="party-image"
      />
      <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-xl text-white">
        {party.name}
      </div>
      <div className="w-full absolute bottom-0 left-0 flex justify-center text-white bg-black bg-opacity-50 py-1 rounded-b-lg">
        {`${party.startDate.slice(5).replace("-", "/")} | ${party.headcount}/${
          party.capacity
        }명 | ${party.price / 10000}만원~`}
      </div>
    </div>
  );
}

export default PartyItem;