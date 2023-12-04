import { useState } from "react";
import { dateToGapKorean } from "../../../../../utils";
import ReplyItem from "./ReplyItem";
import ReplyForm from "./ReplyForm";

function CommentItem({ profileImg, nickname, createdAt, content, replies }) {
  const [showReply, setShowReply] = useState(false);

  return (
    <div className="py-5">
      <div className="flex gap-2.5">
        <img
          src={profileImg}
          alt="profile_image"
          className="w-10 h-10 rounded-full"
        />
        <div className="h-10 flex flex-col justify-center">
          <p className="text-sm text-black font-bold">{nickname}</p>
          <p className="text-sm text-[#3E3E3E] font-medium">
            {dateToGapKorean(createdAt)}
          </p>
        </div>
      </div>
      <div className="ml-[50px]">
        <div className="w-full text-base text-[#3E3E3E] font-medium whitespace-pre-wrap mt-2.5 mb-5">
          {content}
        </div>
        <div className="flex gap-8 text-xs">
          <button
            className="text-primary"
            onClick={() => setShowReply(!showReply)}
          >{`답글 ${replies.length}개`}</button>
          <button className="text-darkgray">톡 보내기</button>
          <button className="text-darkgray">신고</button>
        </div>
        <div
          className={`w-full transition-all duration-500 overflow-hidden border-l-2 border-[#F4F4F4] mt-5 ${
            showReply ? "max-h-[1000px] " : "max-h-0"
          }`}
        >
          <div className="ml-8">
            {replies.map((reply) => (
              <ReplyItem key={reply.replyId} {...reply} />
            ))}
            <ReplyForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
