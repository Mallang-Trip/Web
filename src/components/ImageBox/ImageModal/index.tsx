import {
  Dispatch,
  memo,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Zoom, Navigation, Pagination } from "swiper/modules";
import headerBack from "../../../assets/svg/header-back.svg";
import clsx from "clsx";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  images: string[];
  name: string;
  setSwiperRef: any;
}

function ImageModal({
  showModal,
  setShowModal,
  images,
  name,
  setSwiperRef,
}: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const closeModal = useCallback(() => setShowModal(false), []);

  const modalOutSideClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.value === "swiper-zoom-container") closeModal();
  }, []);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") closeModal();
  }, []);

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
      className={clsx(
        "modal-container fixed top-0 left-0 z-50 w-screen h-real-screen bg-darkgray bg-opacity-90 scale-100 flex",
        showModal && "active"
      )}
      ref={modalRef}
      onClick={modalOutSideClick}
    >
      <button
        className="fixed top-3 left-3 z-50 rounded-xl hover:bg-black/10 w-8 h-8 flex items-center justify-center"
        onClick={closeModal}
      >
        <img src={headerBack} alt="닫기" />
      </button>
      <Swiper
        onSwiper={setSwiperRef}
        style={
          {
            "--swiper-navigation-color": "#ffffff",
            "--swiper-pagination-color": "#ffffff",
          } as React.CSSProperties
        }
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

export default memo(ImageModal);
