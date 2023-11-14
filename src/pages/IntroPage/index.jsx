import { useRef } from "react";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import introLogo from "../../assets/images/intro_logo.png";
import introIcon from "../../assets/images/intro_icon.png";

function IntroPage() {
  const titleRef = useRef();
  const visionRef = useRef();
  const serviceRef = useRef();
  const matchingRef = useRef();
  const webRef = useRef();
  const talkRef = useRef();
  const communityRef = useRef();
  const preMapRef = useRef();
  const missionRef = useRef();
  const mallangTripRef = useRef();
  const viewTitle = useIntersectionObserver(titleRef);
  const viewVision = useIntersectionObserver(visionRef);
  const viewService = useIntersectionObserver(serviceRef);
  const viewMatching = useIntersectionObserver(matchingRef);
  const viewWeb = useIntersectionObserver(webRef);
  const viewTalk = useIntersectionObserver(talkRef);
  const viewCommunity = useIntersectionObserver(communityRef);
  const viewPreMap = useIntersectionObserver(preMapRef);
  const viewMission = useIntersectionObserver(missionRef);
  const viewMallangTrip = useIntersectionObserver(mallangTripRef);

  return (
    <div>
      <div
        ref={titleRef}
        id="title"
        className={`mt-40 mb-10 text-2xl md:text-4xl text-black text-center font-bold ${
          viewTitle ? "animate-fade-up animate-ease-in" : "opacity-0"
        }`}
      >
        버스보다 빠르고, 택시보다 저렴하게.
        <br />
        택시 카풀 여행 플랫폼 말랑트립
      </div>

      <div className="flex min-h-[650px] relative">
        <img
          src={introLogo}
          alt="말랑트립"
          className="w-full absolute md:static top-0 left-0"
        />

        <div
          className={`w-full my-auto px-2 md:px-0 ${
            viewVision ? "animate-fade-up animate-ease-in" : "opacity-0"
          }`}
          ref={visionRef}
          id="vision"
        >
          <p className="text-xl text-primary">VISION</p>
          <p className="text-xl md:text-3xl text-black font-bold mt-1 mb-5">
            세상의 모든 여행자가 타지에서
            <br />
            교통 걱정 없도록 만드는 것
          </p>
          <p className="text-sm md:text-base text-black">
            차를 운전하지 못하는 뚜벅이 여행자들은, 교통이 불편한 지역을
            여행하기가 무척 어렵습니다.
            <br />
            버스를 타자니 너무 느리고, 택시를 타자니 너무 비쌉니다.
            <br />
            그 외에 다른 선택지도 비싸고 부담되기는 마찬가지입니다.
            <br />
            따라서 뚜벅이 여행자들이 그러한 고민을 겪지 않고도 타지를 쉽게
            여행할 수 있도록 하기 위해
            <br />
            말랑트립이 탄생했습니다.
          </p>
        </div>
      </div>

      <div className="max-w-4xl my-80 mx-auto px-2">
        <div
          ref={serviceRef}
          id="service"
          className={`${
            viewService ? "animate-fade-up animate-ease-in" : "opacity-0"
          }`}
        >
          <p className="text-xl text-primary">SERVICE</p>
          <p className="text-xl md:text-3xl text-black font-bold mt-1 mb-5">
            편리하게 여행할 수 있도록
            <br />
            우리가 준비했어요
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div
            ref={matchingRef}
            id="matching"
            className={`w-full md:max-w-[422px] shadow-lg rounded-2xl pt-7 pb-12 px-10 bg-[#FAFAFA] ${
              viewMatching ? "animate-fade-up animate-ease-in" : "opacity-0"
            }`}
          >
            <p className="text-xl md:text-2xl font-bold text-black mb-24 whitespace-pre">
              {"다수의 여행자와\n드라이버 매칭 서비스"}
            </p>
            <p className="text-sm text-darkgray">
              여행자 다수와 한 명의 드라이버를 매칭하여 1/n 이라는 더 저렴한
              가격으로 여행을 즐길 수 있습니다.
            </p>
          </div>

          <div
            ref={webRef}
            id="web"
            className={`w-full max-w-[422px] shadow-lg rounded-2xl pt-7 pb-12 px-10 bg-[#FAFAFA] ${
              viewWeb ? "animate-fade-up animate-ease-in" : "opacity-0"
            }`}
          >
            <p className="text-xl md:text-2xl font-bold text-black mb-24 whitespace-pre">
              {"웹과 모바일 동시 서비스\n "}
            </p>
            <p className="text-sm text-darkgray">
              웹과 모바일 모두 지원합니다. 여행 계획은 웹에서 쾌적하게, 여행할
              땐 모바일로 간편하게 접속해보세요
            </p>
          </div>

          <div
            ref={talkRef}
            id="talk"
            className={`w-full max-w-[422px] shadow-lg rounded-2xl pt-7 pb-12 px-10 bg-[#FAFAFA] ${
              viewTalk ? "animate-fade-up animate-ease-in" : "opacity-0"
            }`}
          >
            <p className="text-xl md:text-2xl font-bold text-black mb-24 whitespace-pre">
              {"말랑톡을 통한\n채팅 기능"}
            </p>
            <p className="text-sm text-darkgray">
              말랑톡을 통해 여행 전 동행자들과 자유롭게 더욱 편리한 여행을
              준비할 수 있어요.
            </p>
          </div>

          <div
            ref={communityRef}
            id="community"
            className={`w-full max-w-[422px] shadow-lg rounded-2xl pt-7 pb-12 px-10 bg-[#FAFAFA] ${
              viewCommunity ? "animate-fade-up animate-ease-in" : "opacity-0"
            }`}
          >
            <p className="text-xl md:text-2xl font-bold text-black mb-24 whitespace-pre">
              {"경험을 공유할 수 있는\n커뮤니티 서비스"}
            </p>
            <p className="text-sm text-darkgray">
              커뮤니티에서 동승자를 구하고 여행 정보를 얻을 수 있어요. 그 외
              자유로운 소통도 좋습니다!
            </p>
          </div>
        </div>
      </div>

      <div className="w-full h-[700px] bg-[#171717] flex justify-center items-center text-center px-2 md:px-0">
        <div
          ref={preMapRef}
          id="preMap"
          className={`${
            viewPreMap ? "animate-fade-up animate-ease-in" : "opacity-0"
          }`}
        >
          <div className="text-2xl md:text-3xl text-[#F4F4F4] font-bold mb-8">
            말랑트립은 경기콘텐츠진흥원
            <br />
            PRE-MAP의 지원을 받았습니다.
          </div>
          <div className="flex flex-col md:flex-row items-center gap-5">
            <div className="border-2 border-[#F4F4F4] rounded-full py-2 px-4 text-[#F4F4F4] text-xs md:text-sm font-bold">
              2023.08
            </div>
            <div className="text-[#F4F4F4] text-base md:text-xl">
              PRE-MAP 지원금 1,000만원 유치
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[700px] bg-white flex justify-center items-center text-center px-2 md:px-0">
        <div
          ref={missionRef}
          id="mission"
          className={`${
            viewMission ? "animate-fade-up animate-ease-in" : "opacity-0"
          }`}
        >
          <p className="text-xl text-primary">OUR MISSION</p>
          <p className="text-xl md:text-3xl text-black font-bold mt-1 mb-5">
            국내 여행지로 출발하여 전세계로 도착하는 것
          </p>
          <p className="text-sm md:text-base text-black">
            전세계의 많은 뚜벅이 여행자들이 안전, 시간, 비용 문제에 많은
            어려움을 겪고 있습니다.
            <br />
            말랑트립은 이 문제들을 전부 해결하기 위해 노력합니다.
          </p>
        </div>
      </div>

      <div className="w-full h-[700px] bg-skyblue flex justify-center items-center text-center px-2 md:px-0">
        <div
          ref={mallangTripRef}
          id="mallangTrip"
          className={`${
            viewMallangTrip ? "animate-fade-up animate-ease-in" : "opacity-0"
          }`}
        >
          <p className="text-xl md:text-3xl text-black font-bold">
            여행을 시작하는 것은 어렵지 않습니다.
            <br />
            우리와 함께 여행을 떠나볼까요?
          </p>
          <img
            src={introIcon}
            alt="말랑트립 아이콘"
            className="mx-auto my-12"
          />
          <button className="w-80 py-4 bg-primary text-white text-base rounded-xl">
            말랑트립 둘러보기
          </button>
        </div>
      </div>

      <div className="mt-14 mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mx-5 sm:mx-12">
        <div className="text-xs text-darkgray">
          <p className="text-sm text-[#3E3E3E] font-bold mb-2.5">말랑트립</p>
          <p>대표: 김제윤</p>
          <p className="my-1">사업자등록번호: 399-51-00784</p>
          <p>경기도 의왕시 모락로 89-15 109동 403호</p>
        </div>
        <div className="text-xs text-darkgray">
          <p className="text-sm text-[#3E3E3E] font-bold mb-2.5">고객문의</p>
          <p>실시간 고객상담: 말랑톡</p>
          <p className="my-1">유선 번호: 070-0000-0000</p>
          <p>기타문의: mallangtrip@gmail.com</p>
        </div>
        <div className="text-xs text-darkgray">
          <p className="text-sm text-[#3E3E3E] font-bold mb-2.5">SNS</p>
          <p>INSTAGRAM: @mallang_trip</p>
        </div>
      </div>
    </div>
  );
}

export default IntroPage;
