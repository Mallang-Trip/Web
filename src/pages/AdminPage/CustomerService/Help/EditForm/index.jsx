import { useRef, useState } from "react";
import { uploadImage } from "../../../../../api/image";
import { postAnnouncement } from "../../../../../api/announcement";
import Title from "../../../../../components/Title";
import ImageInputBox from "../../../../CommunityPostPage/ArticleInfoForm/ImageInputBox";

function EditForm({ helpType, setMessage, setShowMessageModal }) {
  const textareaRef = useRef();
  const [images, setImages] = useState([undefined, undefined, undefined]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      const imagesURL = await Promise.all(
        images
          .filter((image) => image)
          .map(async (image) =>
            typeof image === "string" ? image : await uploadImage(image)
          )
      );
      const body = {
        title: title,
        content: content,
        images: imagesURL,
        type: helpType,
      };
      const result = await postAnnouncement(body);
      console.log(result.payload.announcementId);
      setMessage("공지사항이 등록되었습니다.");
    } catch (e) {
      console.log(e);
      setMessage("공지사항 등록에 실패했습니다.");
    } finally {
      setLoading(false);
      setShowMessageModal(true);
    }
  };

  const contentHandler = (e) => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setContent(e.target.value);
  };

  return (
    <div>
      <Title title="공지사항 글 작성" />
      <div className="mt-10">
        <ImageInputBox
          showImageInput={true}
          images={images}
          setImages={setImages}
        />
      </div>
      <form className="mt-10 font-medium" onSubmit={submitHandler}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
          className="w-full text-2xl text-black placeholder:text-darkgray focus:outline-none"
        />
        <hr className="bg-mediumgray mt-4 mb-8 h-px border-0" />
        <textarea
          ref={textareaRef}
          value={content}
          onChange={contentHandler}
          placeholder="내용을 작성해주세요."
          className="w-full min-h-[320px] text-sm text-boldgray placeholder:text-darkgray focus:outline-none resize-none noScrollBar"
        />
        <div className="flex justify-center items-center mt-[70px]">
          <button
            type="submit"
            className="h-14 text-lg text-white font-bold rounded-full text-md w-64 md:w-80 bg-primary"
          >
            게시하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditForm;
