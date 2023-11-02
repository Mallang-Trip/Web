import React from "react";
import { useState } from "react";
function MapDateBtn({ date }) {
  const [clicked, setBtnClicked] = useState(false);
  return (
    <div className="flex justify-center my-20">
      <button className="mx-auto h-12 text-white rounded-full text-lg w-4 md:w-20 bg-primary">
        {date}
      </button>
    </div>
  );
}

export default MapDateBtn;
