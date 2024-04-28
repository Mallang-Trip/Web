function Inquiry() {
  const mockData = [
    {
      image: "",
      name: "jelly217",
      text: "이것은 톡 내용입니다!!!",
      count: 15,
      time: 0,
    },
    {
      image: "",
      name: "snoopy5",
      text: "이것은 톡 내용입니다!!!",
      count: 5,
      time: 0,
    },
    {
      image: "",
      name: "applew00",
      text: "이것은 톡 내용입니다!!!",
      count: 5,
      time: 0,
    },
    {
      image: "",
      name: "가을정모",
      text: "이것은 톡 내용입니다!!!",
      count: 0,
      time: 0,
    },
    {
      image: "",
      name: "말랑트립",
      text: "이것은 톡 내용입니다!!!",
      count: 5,
      time: 0,
    },
    {
      image: "",
      name: "라벤더좋아",
      text: "이것은 톡 내용입니다!!!",
      count: 0,
      time: 0,
    },
    {
      image: "",
      name: "여행이좋은부지런한J",
      text: "이것은 톡 내용입니다!!!",
      count: 1,
      time: 0,
    },
  ];
  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-12">
        <div className="flex text-2xl">
          고객센터 말랑톡
          <div className="text-primary ml-2">{mockData.length}건 대기 중</div>
        </div>
        <button className="flex items-center h-10 bg-skyblue text-primary border border-primary text-sm rounded-xl pl-8 pr-5 py-1">
          편집
        </button>
      </div>
      {mockData.map((item, index) => (
        <div
          key={index}
          className="flex justify-between w-full h-28 items-center"
        >
          <div className="flex justify-start items-center">
            <img
              className="w-14 h-14 rounded-full bg-gray300 mr-5"
              alt=""
              src={item.image}
            />
            <div className="flex flex-col justify-center text-lg">
              {item.name}
              <div className="text-sm text-darkgray mt-2">{item.text}</div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center text-xs">
            {item.time}분 전
            <div className="flex items-center justify-center text-white bg-primary w-7 h-7 rounded-full mt-2">
              {item.count}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Inquiry;
