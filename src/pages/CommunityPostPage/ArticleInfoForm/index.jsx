import { useEffect, useState } from "react";
import TypeDropBox from "./TypeDropBox";
import PartySelectBox from "./PartySelectBox";
import ImageInputBox from "./ImageInputBox";

function ArticleInfoForm({
  selectedType,
  setSelectedType,
  selectedParty,
  setSelectedParty,
  images,
  setImages,
}) {
  const [showDropBox, setShowDropBox] = useState(false);
  const [showImageInput, setShowImageInput] = useState(false);

  useEffect(() => {
    images.forEach((item) => {
      if (item) setShowImageInput(true);
    });
  }, [images]);

  return (
    <>
      <div className="my-9 flex gap-9 flex-wrap">
        <div className="flex gap-4">
          <p className="text-sm text-black font-bold w-[70px] h-[50px] py-4">
            게시판 선택
          </p>
          <TypeDropBox
            showDropBox={showDropBox}
            setShowDropBox={setShowDropBox}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
        </div>
        <div className="flex gap-4">
          <p className="text-sm text-black font-bold w-[70px] h-[50px] py-4 whitespace-nowrap">
            파티 선택
          </p>
          <PartySelectBox
            selectedParty={selectedParty}
            setSelectedParty={setSelectedParty}
          />
        </div>
        <button
          className="h-[50px] text-sm text-primary font-bold underline underline-offset-4"
          onClick={() => setShowImageInput(!showImageInput)}
        >
          {showImageInput ? "사진 추가 취소" : "사진 추가하기"}
        </button>
      </div>
      <ImageInputBox
        showImageInput={showImageInput}
        images={images}
        setImages={setImages}
      />
    </>
  );
}

export default ArticleInfoForm;
