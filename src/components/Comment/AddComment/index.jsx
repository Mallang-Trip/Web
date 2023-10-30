import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../../../api/image";
import { postComment } from "../../../api/driver";
import cameraIcon from "../../../assets/svg/camera.svg";
import CheckModal from "../../CheckModal";
import ConfirmModal from "../../ConfirmModal";

function AddComment({ id }) {
  const imageRef = useRef();
  const navigation = useNavigate();
  const user = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [star, setStar] = useState("");
  const [comment, setComment] = useState("");
  const [commentImage, setCommentImage] = useState(undefined);

  const starHandler = ({ target }) => {
    const value = target.value;
    const regex = /^\d*\.?\d{0,1}$/;

    if (regex.test(value)) {
      setStar(value);
    }
  };

  const imageHandler = () => {
    const imageFile = document.getElementById("commentImage_input").files[0];
    setCommentImage(imageFile || undefined);
  };

  const sumbitHandler = async () => {
    if (!user.auth) return setShowModal(true);

    if (star === 0) {
      setConfirmMessage("별점을 입력해주세요.");
      setShowConfirmModal(true);
      return;
    }
    if (comment === "") {
      setConfirmMessage("댓글을 입력해주세요.");
      setShowConfirmModal(true);
      return;
    }

    const imageURL = commentImage ? await uploadImage(commentImage) : null;
    const body = {
      content: comment,
      images: [imageURL],
      rate: star,
    };

    try {
      const result = await postComment(body, id);

      if (result.statusCode === 409) {
        setConfirmMessage("이미 등록된 댓글이 있습니다.");
        setShowConfirmModal(true);
      } else {
        alert("성공적으로 댓글을 등록하였습니다.");
        location.reload();
      }
    } catch (e) {
      setConfirmMessage("댓글 전송에 실패했습니다.");
      setShowConfirmModal(true);
    }
  };

  return (
    <>
      <div className="w-full min-h-48 border-2 border-black rounded-[20px] p-3 relative">
        <div className="flex gap-2 mb-3">
          <div className="text-lg font-bold">MyMyID</div>
          <div className="flex gap-1 text-sm items-center">
            <div>평점: </div>
            <input
              type="number"
              step={"0.1"}
              placeholder="0"
              className="text-primary placeholder:text-primary w-6 focus:outline-none"
              value={star}
              onChange={starHandler}
            />
            <div>/ 5.0</div>
          </div>
        </div>
        <div className="mb-3 border-b border-primary">
          <textarea
            className="w-full h-20 text-black text-sm placeholder:text-darkgray focus:outline-none resize-none overflow-hidden"
            placeholder="댓글 작성하기"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
        </div>
        <label htmlFor="commentImage_input">
          <button
            className="absolute top-2 right-2"
            onClick={() => imageRef.current.click()}
          >
            <img src={cameraIcon} alt="image" />
          </button>
        </label>
        <input
          ref={imageRef}
          className="hidden"
          id="commentImage_input"
          type="file"
          accept="image/*"
          onChange={imageHandler}
        />
        {commentImage && (
          <img
            className="object-cover max-w-xs mx-auto rounded-2xl"
            src={URL.createObjectURL(commentImage)}
            alt="Comment_Image"
          />
        )}

        <div className="flex justify-end mt-1">
          <button
            className="w-[86px] h-[30px] text-white bg-primary rounded-full text-sm"
            onClick={sumbitHandler}
          >
            등록
          </button>
        </div>
      </div>
      <CheckModal
        showModal={showModal}
        setShowModal={setShowModal}
        message={"로그인이 필요한 서비스입니다.\n로그인 화면으로 이동할까요?"}
        noText="아니요"
        yesText="네"
        yesHandler={() => navigation("/login")}
      />
      <ConfirmModal
        showModal={showConfirmModal}
        setShowModal={setShowConfirmModal}
        message={confirmMessage}
      />
    </>
  );
}

export default AddComment;
