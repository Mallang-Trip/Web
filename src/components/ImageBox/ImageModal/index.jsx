import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom, Navigation, Pagination } from "swiper/modules";

function ImageModal({ showModal, setShowModal, images, name, setSwiperRef }) {
  const modalRef = useRef();

  const closeModal = () => setShowModal(false);

  const modalOutSideClick = (e) => {
    if (e.target.classList.value === "swiper-zoom-container") closeModal();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Escape") closeModal();
  };

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showModal]);

  return createPortal(
    <div
      className={`modal-container fixed top-0 left-0 z-50 w-screen h-real-screen bg-darkgray bg-opacity-90 scale-100 flex ${
        showModal ? "active" : ""
      }`}
      ref={modalRef}
      onClick={(e) => modalOutSideClick(e)}
    >
      <Swiper
        onSwiper={setSwiperRef}
        style={{
          "--swiper-navigation-color": "#ffffff",
          "--swiper-pagination-color": "#ffffff",
        }}
        zoom={true}
        loop={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Zoom, Navigation, Pagination]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index + image}>
            <div className="swiper-zoom-container">
              <img
                src={image}
                alt={name}
                className="w-full md:w-4/5 rounded-xl"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>,
    document.body
  );
}

export default ImageModal;
