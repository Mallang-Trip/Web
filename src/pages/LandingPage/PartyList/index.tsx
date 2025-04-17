import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getPartyList, getCourseList } from "@/api/party";
import { dateToString, shuffleArray } from "@/utils";
import { Course, DriverData, HeartParty } from "@/types";
import { getDriver } from "@/api/driver";
import PartyBox from "./PartyBox";
import NoParty from "./NoParty";
import DriverBox from "./DriverBox";
import CourseBox from "./CourseBox";
import Skeleton from "./Skeleton";

function PartyList() {
  const { region, nowDate, num, price } = useSelector(
    (state: RootState) => state.partyFilter
  );
  const [partyData, setPartyData] = useState<HeartParty[]>([]);
  const [courseData, setCourseData] = useState<Course[]>([]);
  const [driverData, setDriverData] = useState<DriverData[]>([]);
  const [loading, setLoading] = useState(true);

  const ramdomSeed = useMemo(() => {
    const today = new Date();
    return (
      today.getFullYear() * 10000 +
      (today.getMonth() + 1) * 100 +
      today.getDate()
    );
  }, []);

  const getData = useCallback(async () => {
    const regionQuery = region === "모든 지역" ? "all" : region;
    const nowDateQuery =
      nowDate.length === 0
        ? ["all", "all"]
        : nowDate.map((item) => dateToString(item));
    const numQuery = num;
    const priceQuery = price;

    try {
      const driverResult = await getDriver();
      const PartyResult = await getPartyList(
        regionQuery,
        nowDateQuery,
        numQuery,
        priceQuery
      );
      const courseResult = await getCourseList(
        regionQuery,
        numQuery,
        priceQuery
      );

      setPartyData(PartyResult.payload);
      setCourseData(shuffleArray(courseResult.payload, ramdomSeed) as Course[]);
      setDriverData(
        shuffleArray(driverResult.payload, ramdomSeed) as DriverData[]
      );
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [region, nowDate, num, price, ramdomSeed]);

  useEffect(() => {
    getData();
    window.scrollTo({ top: 0 });
  }, [region, nowDate, num, price, ramdomSeed]);

  if (loading) return <Skeleton count={20} />;
  if (
    partyData.length === 0 &&
    courseData.length === 0 &&
    driverData.length === 0
  )
    return <NoParty />;
  return (
    <div className="mt-6 mx-auto">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {partyData.map((item) => (
          <PartyBox key={item.partyId} {...item} />
        ))}
        {courseData.map((item) => (
          <CourseBox key={item.courseId} {...item} />
        ))}
      </div>
      <p className="mt-12 mb-6 text-2xl text-black font-bold">추천 드라이버</p>
      <div className="flex gap-5 overflow-x-auto scroll-smooth custom-scrollbar">
        {driverData.map((item) => (
          <DriverBox key={item.driverId} {...item} />
        ))}
      </div>
    </div>
  );
}

export default memo(PartyList);
