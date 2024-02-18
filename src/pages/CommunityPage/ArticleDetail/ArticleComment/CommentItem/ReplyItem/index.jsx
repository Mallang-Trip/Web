import { useSelector } from "react-redux";
import { dateToGapKorean } from "../../../../../../utils";
import { useState } from "react";
import { deleteMyReply } from "../../../../../../api/article";
import CheckModal from "../../../../../../components/CheckModal";
import basicProfileImage from "../../../../../../assets/images/profileImage.png";

function ReplyItem({
  reloadArticle,
  replyId,
  profileImg,
  nickname,
  createdAt,
  content,
  userId,
  deleted,
}) {
  const user = useSelector((state) => state.user);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deleteHandler = async () => {
    try {
      await deleteMyReply(replyId);
      setShowDeleteModal(false);
      reloadArticle();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="py-5">
        <div className="flex gap-2.5">
          <img
            src={profileImg || basicProfileImage}
            alt="profile_image"
            className="w-10 h-10 rounded-full"
          />
          <div className="h-10 flex flex-col justify-center">
            <p className="text-sm text-black font-bold">{nickname}</p>
            <p className="text-sm text-boldgray font-medium">
              {dateToGapKorean(createdAt)}
            </p>
          </div>
        </div>
        <div className="ml-[50px]">
          <div className="w-full text-base text-boldgray font-medium whitespace-pre-wrap mt-2.5 mb-5">
            {content}
          </div>
          <div className="flex gap-8 text-xs text-darkgray">
            <button>톡 보내기</button>
            <button>신고</button>
            {user.userId === userId && !deleted && (
              <button onClick={() => setShowDeleteModal(true)}>삭제</button>
            )}
          </div>
        </div>
      </div>

      <CheckModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        message={"답글을 삭제하시겠습니까?"}
        noText={"취소"}
        yesText={"확인"}
        yesHandler={() => deleteHandler()}
      />
    </>
  );
}

export default ReplyItem;
