import RegionButton from "./RegionButton";
import jeju from "../../../assets/images/제주도 이미지.jpg";
import gangwon from "../../../assets/images/강원도 이미지.jpg";
import uleng from "../../../assets/images/울릉도 이미지.jpg";

const regionData = [
  {
    image: jeju,
    name: "제주도",
    price: "9시간 18만원",
  },
  {
    image: gangwon,
    name: "강원도",
    price: "10시간 20만원",
  },
  {
    image: uleng,
    name: "울릉도",
    price: "가격 변동제",
  },
];

function Region({ setRegion, member, driverId, date }) {
  return (
    <>
      <div className="pb-3 pl-5 mx-auto text-2xl text-black font-bold">
        가고 싶은 여행지를 찾아요
      </div>
      <div className="grid grid-cols-2 gap-10 px-6 mx-auto py-8 md:grid-cols-3 lg:grid-cols-4 overflow-auto">
        {regionData.map((item) => (
          <RegionButton
            {...item}
            key={item.name}
            setRegion={setRegion}
            member={member}
            driverId={driverId}
            date={date}
          />
        ))}
      </div>
    </>
  );
}

export default Region;
