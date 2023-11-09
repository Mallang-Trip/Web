import { useState } from "react";
import Region from "./Region";
import jeju from "../../../assets/images/제주도 이미지.jpg";
import gangwon from "../../../assets/images/강원도 이미지.jpg";
import uleng from "../../../assets/images/울릉도 이미지.jpg";
import jinhye from "../../../assets/images/진해.jpg";

const regionData = [
  {
    image: jeju,
    name: "제주도",
  },
  {
    image: gangwon,
    name: "강원도",
  },
  {
    image: uleng,
    name: "울릉도",
  },
  {
    image: jinhye,
    name: "진해",
  },
];

function RegionList({ setActiveNext }) {
  const [region, setRegion] = useState("");

  const regionHandler = (name) => {
    setRegion(name);
    setActiveNext(true);
  };

  return (
    <div className="grid grid-cols-2 gap-10 px-10 py-8 md:grid-cols-3 lg:grid-cols-4 h-full bg-white rounded-xl overflow-auto">
      {regionData.map((item) => (
        <Region
          key={item.name}
          region={region}
          image={item.image}
          name={item.name}
          regionHandler={regionHandler}
        />
      ))}
    </div>
  );
}

export default RegionList;
