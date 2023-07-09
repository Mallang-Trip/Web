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
      <div className="left-32 top-1/2 absolute font-bold text-2xl text-white">
        <p>{props.name}</p>
      </div>
    </div>
  );
}

export default Travel;
