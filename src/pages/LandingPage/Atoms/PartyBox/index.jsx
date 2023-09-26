import React from "react";
import { useNavigate } from "react-router-dom";

function PartyBox({ party }) {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`/party/${props.name}`);
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
      <div className="w-full absolute bottom-0 left-0 flex justify-center text-white">
        {`${party.date} | ${party.people} | ${party.price}`}
      </div>
    </div>
  );
}

export default PartyBox;
