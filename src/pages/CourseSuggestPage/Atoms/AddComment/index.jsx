import { TextField } from "@mui/material";
import React, { useState } from "react";
import ReservBtn from "../../../PartyPage/ReservBtn";
function AddComment() {
  let [comment, setComment] = useState("");

  return (
    <div>
      <div className="text-[14px] text-gray p-7">댓글 더보기</div>

      <div className="w-full relative h-44 border-2 border-black rounded-[20px] p-3">
        <div className="flex gap-3">
          <div className="text-lg pb-3">MyMyID</div>
          <div className="flex">
            <div className="text-sm">평점: </div>
            <input
              id="star"
              type="number"
              placeholder="평점을 입력해주세요"
              className="placeholder-blue-600 placeholder:p-5 h-4"
            />

            <div className="text-sm">/5.0</div>
          </div>
        </div>

        <div>
          <input
            type="text"
            className="absolute w-3/4 border-0 text-[14px] focus:outline-none"
            placeholder="댓글 작성하기"
            onChange={(e) => {
              setComment(e.target.value);
            }}
            value={comment}
          />
        </div>
        <div className="">
          <button className="absolute bottom-0 right-0 top-3/4 w-[86px] h-[30px] text-white bg-primary px-3 rounded-2xl mr-3 text-lg hover:cursor-pointer">
            등록
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddComment;
