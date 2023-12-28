import exampleImg from "../../../../assets/images/단양.jpg";

function ArticleBody({ type }) {
  return (
    <div className="w-full px-6 pb-10 border-b border-[#D9D9D9]">
      {type === "notice" && (
        <p className="mt-4 text-xs text-darkgray font-medium">
          작성일 2023.08.09
        </p>
      )}
      <p className="mt-10 text-sm text-black font-medium whitespace-pre-wrap">
        {
          "안녕하세요. 이 공간은 해당 공지글이 서술되는 공간입니다.\n결제 방식은 파티원 전원이 원금 지불 후 여행 전날 페이백하는 시스템으로 할지, 아니면 선예약금 지불 후 여행 전날 잔금 결제하는 시스템으로 할지 고민중입니다.\n기획 팀 회의할 예정이니까 참고해줘요.\n\n결제 방식은 2차 결제 방식으로 이루어집니다.\n공지사항 텍스트는 게시물 너비에 맞게 할 필요 없습니다!\n우선 텍스트 너비를 600에 맞춰 하면 좋을 것 같습니다!~~~~~."
        }
      </p>
      {type === "notice" && (
        <img
          src={exampleImg}
          alt="image"
          className="w-full max-w-[500px] mx-auto mt-6"
        />
      )}
    </div>
  );
}

export default ArticleBody;
