import { useState } from "react";
import ImageModal from "./ImageModal";

function PartyImageBox({ images, name }) {
  const IMAGES = [
    images[0],
    images[1] || images[0],
    images[2] || images[0],
    images[3] || images[0],
    images[4] || images[0],
  ];
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageIdx, setImageIdx] = useState(0);

  const imageClickHandler = (idx) => {
    setImageIdx(idx);
    setShowImageModal(true);
  };

  return (
    <>
      <div className="grid grid-cols-2 mt-2 rounded-3xl overflow-hidden">
        <div className="overflow-hidden">
          <img
            className="object-cover rounded-l-3xl transition duration-300 ease-in-out hover:scale-110 cursor-pointer"
            src={IMAGES[0]}
            alt={name}
            onClick={() => imageClickHandler(0)}
          />
        </div>
        <div className="grid grid-cols-2 overflow-hidden">
          <div className="overflow-hidden">
            <img
              className="object-cover h-full transition duration-300 ease-in-out hover:scale-110 cursor-pointer"
              src={IMAGES[1]}
              alt={name}
              onClick={() => imageClickHandler(1)}
            />
          </div>
          <div className="overflow-hidden">
            <img
              className="rounded-tr-3xl object-cover h-full transition duration-300 ease-in-out hover:scale-110 cursor-pointer"
              src={IMAGES[2]}
              alt={name}
              onClick={() => imageClickHandler(2)}
            />
          </div>
          <div className="overflow-hidden">
            <img
              className="object-cover h-full transition duration-300 ease-in-out hover:scale-110 cursor-pointer"
              src={IMAGES[3]}
              alt={name}
              onClick={() => imageClickHandler(3)}
            />
          </div>
          <div className="overflow-hidden">
            <img
              className="rounded-br-3xl object-cover h-full transition duration-300 ease-in-out hover:scale-110 cursor-pointer"
              src={IMAGES[4]}
              alt={name}
              onClick={() => imageClickHandler(4)}
            />
          </div>
        </div>
      </div>
      <ImageModal
        showModal={showImageModal}
        setShowModal={setShowImageModal}
        images={IMAGES}
        imageIdx={imageIdx}
        setImageIdx={setImageIdx}
        name={name}
      />
    </>
  );
}

export default PartyImageBox;
