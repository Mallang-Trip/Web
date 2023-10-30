import React from "react";
import Down from "../../../assets/svg/Polygon 3.svg";
import Comment from "./Comment";

function CommentList() {
  return (
    <>
      <div className="flex">
        <div className="text-lg font-bold">댓글</div>
        <div className="text-sm mt-1 ml-1.5">17</div>
        <img className="m-1" src={Down} />
      </div>
      <Comment />
      <Comment />
      <button className="text-sm text-darkgray mt-7 mb-6">댓글 더보기</button>
    </>
  );
}

export default CommentList;
