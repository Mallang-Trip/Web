import { useState } from "react";
import { useSelector } from "react-redux";
import { deleteComment, putComment } from "../../../../api/driver";
import {
  deleteDestinationComment,
  putDestinationComment,
} from "../../../../api/destination";
import basicProfileImage from "../../../../assets/images/profileImage.png";
import Star from "../../../../assets/svg/star.svg";

function Comment({
  profileImg,
  nickname,
  rate,
  content,
  isMyComment,
  reviewId,
  images,
  isDriver,
  reloadData,
}) {
  const user = useSelector((state) => state.user);
  const [modifyMode, setModifyMode] = useState(false);
  const [newStar, setNewStar] = useState(rate.toFixed(1));
  const [newContent, setNewContent] = useState(content);

  const starHandler = ({ target }) => {
    const value = target.value;
    const regex = /^\d*\.?\d{0,1}$/;

    if (regex.test(value)) {
      setNewStar(value);
    }
    if (value > 5) alert("평점은 최대 5점까지 입력 가능합니다.");
  };

  const leftButtonHandler = () => {
    if (!modifyMode) return setModifyMode(true);

    setNewContent(content);
    setNewStar(rate.toFixed(1));
    setModifyMode(false);
  };

  const rightButtonHandler = async () => {
    // 댓글 삭제
    if (!modifyMode) {
      try {
        if (isDriver) await deleteComment(reviewId);
        else await deleteDestinationComment(reviewId);

        reloadData();
      } catch (e) {
        console.log(e);
      }

      return;
    }

    if (!newStar || newStar < 0 || newStar > 5 || newContent === "") return;

    // 댓글 수정
    const body = {
      content: newContent,
      images: images,
      rate: newStar,
    };

    try {
      if (isDriver) await putComment(body, reviewId);
      else await putDestinationComment(body, reviewId);

      reloadData();
      setModifyMode(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="mt-3">
      <div className="flex items-center">
        <img
          className="w-10 h-10 rounded-full"
          src={profileImg || basicProfileImage}
        />
        <div className="text-sm font-bold px-2.5">{nickname}</div>
        <div className="ml-2.5 flex items-center gap-1">
          <img src={Star} />
          <input
            type="number"
            max={5}
            placeholder="0"
            className={`text-sm bg-white focus:outline-none w-10 ${
              modifyMode && "text-primary"
            }`}
            value={newStar}
            onChange={starHandler}
            disabled={!modifyMode}
          />
        </div>
        {isMyComment && (
          <div className="flex gap-1 text-xs text-darkgray">
            <button
              className="hover:border-b hover:border-primary"
              onClick={leftButtonHandler}
            >
              {modifyMode ? "취소" : "수정하기"}
            </button>
            <span>|</span>
            <button
              className="hover:border-b hover:border-primary"
              onClick={rightButtonHandler}
            >
              {modifyMode ? "확인" : "삭제하기"}
            </button>
          </div>
        )}
        {!isMyComment && user.role === "ROLE_ADMIN" && (
          <div className="flex gap-1 text-xs text-[#ff0000] font-bold">
            <button
              className="hover:border-b hover:border-[#ff0000]"
              onClick={rightButtonHandler}
            >
              {modifyMode ? "확인" : "삭제하기"}
            </button>
          </div>
        )}
      </div>
      <input
        type="text"
        className={`w-4/5 text-sm ml-12 mt-2 bg-white focus:outline-none ${
          modifyMode && "text-primary"
        }`}
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
        disabled={!modifyMode}
        placeholder="댓글을 입력해주세요."
      />
    </div>
  );
}

export default Comment;
