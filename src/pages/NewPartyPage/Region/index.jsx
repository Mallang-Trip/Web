import RegionButton from "./RegionButton";
import { regionData } from "../../../utils/data";

function Region({ setRegion, member, driverId, date }) {
  return (
    <>
      <div className="pb-3 pl-5 mx-auto text-2xl text-black font-bold">
        가고 싶은 여행지를 찾아요
      </div>
      <div className="grid grid-cols-1 gap-10 px-6 mx-auto py-8 md:grid-cols-3 lg:grid-cols-4 overflow-auto">
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
