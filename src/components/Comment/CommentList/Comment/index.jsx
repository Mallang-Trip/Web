import React, { useState } from "react";
import { deleteComment, putComment } from "../../../../api/driver";
import baseProfileImage from "../../../../assets/images/profileImage.png";
import Star from "../../../../assets/svg/star.svg";
import Info from "../../../../assets/svg/info.svg";

function Comment({
  profileImage,
  nickname,
  rate,
  content,
  isMyComment,
  reviewId,
  images,
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
    if (!modifyMode) {
      try {
        await deleteComment(reviewId);
        alert("성공적으로 댓글을 삭제하였습니다.");
        location.reload();
      } catch (e) {
        console.log(e);
      }

      return;
    }

    const body = {
      content: newContent,
      images: images,
      rate: newStar,
    };

    try {
      await putComment(body, reviewId);
      alert("성공적으로 댓글을 수정하였습니다.");
      location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="mt-7">
      <div className="flex items-center">
        <img className="w-10 h-10" src={profileImage || baseProfileImage} />
        <div className="text-sm ml-1.5 mr-1">{nickname}</div>
        <img src={Info} />
        <div className="mx-2.5 flex">
          <img className="mb-1 mr-1" src={Star} />
          {/* <p className="text-sm">{rate.toFixed(1)}</p> */}
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
        className={`w-full text-sm mt-2 bg-white focus:outline-none ${
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
