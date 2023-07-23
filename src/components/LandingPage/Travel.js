import React from "react";

function Travel(props) {
  return (
    <div className="relative h-64 cursor-pointer">
      <img
        className="w-full h-full absolute top-0 left-0 object-cover object-center rounded-3xl overflow-hidden"
        src={props.src}
        alt="default"
        onClick={() => {}}
      />
      <div className="left-0 top-0 absolute font-bold text-2xl text-white flex flex-row justify-center items-center w-full h-full">
        <span>{props.name}</span>
      </div>
    </div>
  );
}

export default Travel;
