import React from "react";
import { useNavigate } from "react-router-dom";

function PartyBox(props) {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`/party/${props.name}`);
  };

  return (
    <div className="relative h-64 cursor-pointer" onClick={onClickHandler}>
      <img
        className="absolute top-0 left-0 object-cover object-center w-full h-full overflow-hidden rounded-lg"
        src={props.src}
        alt="default"
      />
      <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-xl text-white">
        <p>{props.name}</p>
      </div>
    </div>
  );
}

export default PartyBox;
