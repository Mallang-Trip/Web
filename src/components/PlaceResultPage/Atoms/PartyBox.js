import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function PartyBox(props) {
  const params = useParams();
  const name = params.place;
  const navigate = useNavigate();

  function onClickHandler(name) {
    //console.log(name);
    const result = name;
    navigate(`/party/${name}`, { state: { result: name } });
  }

  return (
    <div
      className="relative h-64 cursor-pointer"
      onClick={() => onClickHandler(props.name)}
    >
      <img
        className="w-full h-full absolute top-0 left-0 object-cover object-center rounded-3xl overflow-hidden"
        src={props.src}
        alt="default"
      />
      <div className="left-32 top-1/2 flex text-xl text-black">
        <p>{props.name}</p>
      </div>
    </div>
  );
}

export default PartyBox;
