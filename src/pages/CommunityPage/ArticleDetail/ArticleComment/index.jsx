import profileImage from "../../../../assets/images/profileImage.png";
import CommentInfo from "./CommentInfo";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const commentData = [
  {
    id: 1,
    profileImage: profileImage,
    userName: "jenny11",
    time: 59,
    comment: "저도 참여 가능할까요??",
    reply: [
      {
        id: 11,
        profileImage: profileImage,
        userName: "jenny11",
        time: 31,
        comment: "제발 답변 부탁드립니다! ㅠㅠ",
      },
      {
        id: 12,
        profileImage: profileImage,
        userName: "jenny44",
        time: 16,
        comment: "저도 같이 가고 싶은데.... 괜찮을까요? 같이 가면 재밌을 듯 ^^",
      },
    ],
  },
  {
    id: 2,
    profileImage: profileImage,
    userName: "jenny22",
    time: 37,
    comment: "멋지네요~!",
    reply: [
      {
        id: 21,
        profileImage: profileImage,
        userName: "jenny55",
        time: 14,
        comment: "그러게요! 너무 멋있어요 ㅋㅋㅋ",
      },
    ],
  },
  {
    id: 3,
    profileImage: profileImage,
    userName: "jenny33",
    time: 7,
    comment: "저도 여기 저번에 가봤는데.. 정말 좋았어요!!!!!",
    reply: [],
  },
];

function ArticleComment() {
  return (
    <div className="py-9">
      <CommentInfo commentCount={commentData.length} />
      <CommentForm />
      {commentData.map((comment) => (
        <CommentItem key={comment.id} commentData={comment} />
      ))}
    </div>
  );
}

export default ArticleComment;
