import React, { useState } from "react";

function AddComment() {
  const [star, setStar] = useState("");
  const [comment, setComment] = useState("");

  return (
    <div>
      <div className="w-full h-48 border-2 border-black rounded-[20px] p-3">
        <div className="flex gap-2 mb-3">
          <div className="text-lg font-bold">MyMyID</div>
          <div className="flex gap-1 text-sm items-center">
            <div>평점: </div>
            <input
              type="text"
              placeholder="입력"
              className="text-primary placeholder:text-primary w-6 focus:outline-none"
              value={star}
              onChange={(e) => setStar(e.target.value)}
            />
            <div>/ 5.0</div>
          </div>
        </div>
        <div>
          <textarea
            className="w-full h-20 text-black text-sm placeholder:text-darkgray focus:outline-none resize-none overflow-hidden"
            placeholder="댓글 작성하기"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
        </div>
        <div className="flex justify-end mt-1">
          <button className="w-[86px] h-[30px] text-white bg-primary rounded-full text-sm">
            등록
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddComment;
