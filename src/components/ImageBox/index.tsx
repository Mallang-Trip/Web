import { memo, useCallback, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import ImageModal from "./ImageModal";

import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Props {
  images: string[];
  name: string;
}

function ImageBox({ images = [], name }: Props) {
  const [swiperRef, setSwiperRef] = useState<any>();
  const [showImageModal, setShowImageModal] = useState(false);

  const slideTo = useCallback(
    (index: number) => {
      swiperRef.slideTo(index - 1, 0);
    },
    [swiperRef]
  );

  const imageClickHandler = useCallback(
    (index: number) => {
      slideTo(index + 1);
      setShowImageModal(true);
    },
    [slideTo]
  );

  if (!images[0]) return null;
  return (
    <>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#ffffff",
            "--swiper-pagination-color": "#ffffff",
          } as React.CSSProperties
        }
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-[300px] md:h-[400px] mt-2.5 rounded-2xl"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index + image}>
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => imageClickHandler(index)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <ImageModal
        showModal={showImageModal}
        setShowModal={setShowImageModal}
        images={images}
        name={name}
        setSwiperRef={setSwiperRef}
      />
    </>
  );
}

export default memo(ImageBox);
