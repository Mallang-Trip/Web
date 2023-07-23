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
        className="w-full h-full absolute top-0 left-0 object-cover object-center rounded-3xl overflow-hidden"
        src={props.src}
        alt="default"
      />
      <div className="left-0 top-0 absolute flex text-xl text-white w-full h-full justify-center items-center">
        <p>{props.name}</p>
      </div>
    </div>
  );
}

export default PartyBox;
