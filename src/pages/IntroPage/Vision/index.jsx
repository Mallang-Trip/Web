import { useIntersectionObserver } from "../../../hooks";
import introLogo from "../../../assets/images/intro_logo.png";

function Vision() {
  const [ref, isIntersecting] = useIntersectionObserver();

  return (
    <div className="flex justify-center items-center h-[908px] relative">
      <div className="h-full absolute top-0 left-0 flex items-center">
        <img src={introLogo} alt="말랑트립" />
      </div>

      <div
        ref={ref}
        className={`w-full px-5 text-center lg:px-0 ${
          isIntersecting ? "animate-fade-up animate-ease-in" : "opacity-0"
        }`}
      >
        <p className="text-xl text-primary">VISION</p>
        <p className="text-xl lg:text-3xl text-black font-bold mt-1 mb-5">
          세상의 모든 여행자가 타지에서
          <br />
          교통 걱정 없도록 만드는 것
        </p>
        <p className="text-sm lg:text-base text-black">
          차를 운전하지 못하는 뚜벅이 여행자들은, 교통이 불편한 지역을
          여행하기가 무척 어렵습니다.
          <br />
          버스를 타자니 너무 느리고, 택시를 타자니 너무 비쌉니다.
          <br />
          그 외에 다른 선택지도 비싸고 부담되기는 마찬가지입니다.
          <br />
          따라서 뚜벅이 여행자들이 그러한 고민을 겪지 않고도
          <br />
          타지를 쉽게 여행할 수 있도록 하기 위해 말랑트립이 탄생했습니다.
        </p>
      </div>
    </div>
  );
}

export default Vision;
