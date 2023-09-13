import React from "react";
import { useNavigate } from "react-router-dom";

function Travel(props) {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`/result/${props.name}`);
  };

  return (
    <div className="relative h-64 cursor-pointer" onClick={onClickHandler}>
      <img
        className="w-full h-full absolute top-0 left-0 object-cover object-center rounded-3xl overflow-hidden"
        src={props.src}
        alt="default"
      />
      <div className="left-0 top-0 absolute font-bold text-2xl text-white flex flex-row justify-center items-center w-full h-full">
        <span>{props.name}</span>
      </div>
    </div>
  );
}

export default Travel;
