import useIntersectionObserver from "../../../hooks/useIntersectionObserver";

function ServiceList() {
  const [serviceRef, viewService] = useIntersectionObserver();
  const [matchingRef, viewMatching] = useIntersectionObserver();
  const [webRef, viewWeb] = useIntersectionObserver();
  const [talkRef, viewTalk] = useIntersectionObserver();
  const [communityRef, viewCommunity] = useIntersectionObserver();

  return (
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
            웹과 모바일 모두 지원합니다. 여행 계획은 웹에서 쾌적하게, 여행할 땐
            모바일로 간편하게 접속해보세요
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
            말랑톡을 통해 여행 전 동행자들과 자유롭게 더욱 편리한 여행을 준비할
            수 있어요.
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
  );
}

export default ServiceList;
