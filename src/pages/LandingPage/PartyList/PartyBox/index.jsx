import { useNavigate } from "react-router-dom";
import { customRoundOne } from "../../../../utils";

function PartyBox({
  partyId,
  image,
  name,
  startDate,
  headcount,
  capacity,
  price,
}) {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`/party/detail/${partyId}`);
  };

  return (
    <div className="relative h-64 cursor-pointer" onClick={onClickHandler}>
      <img
        className="absolute top-0 left-0 object-cover object-center w-full h-full overflow-hidden rounded-lg"
        src={image}
        alt={name}
      />
      <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-xl text-white">
        {name}
      </div>
      <div className="w-full absolute bottom-0 left-0 flex justify-center text-white bg-black bg-opacity-50 py-1 rounded-b-lg">
        {`${startDate
          .slice(5)
          .replace("-", "/")} | ${headcount}/${capacity}명 | ${customRoundOne(
          price / 10000
        )}만원`}
      </div>
    </div>
  );
}

export default PartyBox;
