import { useEffect, useRef } from "react";
import Pagination from "./Pagination";
import NextButton from "./NextButton";

function ImageModal({
  showModal,
  setShowModal,
  images,
  imageIdx,
  setImageIdx,
  name,
}) {
  const modalRef = useRef();
  const scrollRef = useRef();

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) setShowModal(false);
  };

  useEffect(() => {
    scrollRef.current.scrollTo({
      left: scrollRef.current.offsetWidth * imageIdx,
      behavior: "smooth",
    });
  }, [imageIdx]);

  useEffect(() => {
    if (showModal) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [showModal]);

  return (
    <div
      ref={modalRef}
      onClick={(e) => modalOutSideClick(e)}
      className={`modal-container fixed top-0 left-0 z-50 w-screen h-screen bg-darkgray bg-opacity-50 scale-100 flex ${
        showModal ? "active" : ""
      }`}
    >
      <div className="w-full max-w-[900px] mx-auto absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 overflow-x-auto noScrollBar">
        <div className="w-full relative">
          <div
            ref={scrollRef}
            className="w-full flex overflow-hidden flex-shrink-0 rounded-xl aspect-[9/6]"
          >
            {images.map((item, index) => (
              <img
                src={item}
                alt={name}
                key={index}
                className="w-full object-cover"
              />
            ))}
          </div>

          <NextButton
            imageIdx={imageIdx}
            setImageIdx={setImageIdx}
            lastIndex={images.length - 1}
          />
        </div>

        <Pagination
          images={images}
          imageIdx={imageIdx}
          setImageIdx={setImageIdx}
        />
      </div>
    </div>
  );
}

export default ImageModal;
