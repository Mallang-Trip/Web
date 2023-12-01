import { dateToGapKorean } from "../../../../../../utils";

function ReplyItem({ profileImg, nickname, createdAt, content }) {
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
        <div className="flex gap-8 text-xs text-darkgray">
          <button>톡 보내기</button>
          <button>신고</button>
        </div>
      </div>
    </div>
  );
}

export default ReplyItem;
