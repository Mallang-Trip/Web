import React from "react";
import { useParams } from "react-router-dom";

function FirstBox() {
  const { place } = useParams();

  return (
    <div className="w-full h-32 my-auto bg-white rounded-l-lg">
      <p className="mt-3 mb-5 ml-3 text-gray-500 text-sm md:text-base text-gray">
        목적지
      </p>
      <p className="text-lg md:text-xl text-black text-center">{place}</p>
    </div>
  );
}

export default FirstBox;
