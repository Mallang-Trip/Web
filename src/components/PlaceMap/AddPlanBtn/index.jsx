import React from "react";

function AddPlanBtn({ name }) {
  return (
    <div className="absolute bottom-0 left-0 pr-18 flex justify-center ">
      <div className="absolute inset-y-0 left-0 right-0 items-center pl-5 md:px-8 pt-2">
        {name}
      </div>
    </div>
  );
}

export default AddPlanBtn;
