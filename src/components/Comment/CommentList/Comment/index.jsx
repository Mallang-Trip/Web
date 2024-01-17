import { useState } from "react";
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
  reload,
  setReload,
}) {
  const [modifyMode, setModifyMode] = useState(false);
  const [newStar, setNewStar] = useState(rate.toFixed(1));
  const [newContent, setNewContent] = useState(content);

  const starHandler = ({ target }) => {
    const value = target.value;
    const regex = /^\d*\.?\d{0,1}$/;

    if (regex.test(value)) {
      setNewStar(value);
    }
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

        setReload(!reload);
      } catch (e) {
        console.log(e);
      }

      return;
    }

    // 댓글 수정
    const body = {
      content: newContent,
      images: images,
      rate: newStar,
    };

    try {
      if (isDriver) await putComment(body, reviewId);
      else await putDestinationComment(body, reviewId);

      setReload(!reload);
      setModifyMode(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="mt-7">
      <div className="flex items-center">
        <img
          className="w-10 h-10 rounded-full"
          src={
            profileImg.slice(0, 23) === "https://mallang-trip-db"
              ? profileImg
              : basicProfileImage
          }
        />
        <div className="text-sm font-bold ml-1.5 mr-1">{nickname}</div>
        <div className="ml-2.5 flex items-center gap-1">
          <img src={Star} />
          <input
            type="number"
            step={"0.1"}
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
      </div>
      <input
        type="text"
        className={`w-full text-sm ml-11 mt-2 bg-white focus:outline-none ${
          modifyMode && "text-primary"
        }`}
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
        disabled={!modifyMode}
      />
    </div>
  );
}

export default Comment;
