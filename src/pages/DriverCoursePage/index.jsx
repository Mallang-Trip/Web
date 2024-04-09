import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDriverMyInfo } from "../../api/driver";
import { priceToString } from "../../utils";
import PageContainer from "../../components/PageContainer";
import Loading from "../../components/Loading";
import EditMap from "../PartyPage/EditMap";
import CourseDnD from "./CourseDnD";
import SaveButton from "./SaveButton";
import Title from "./Title";
import CourseImage from "./CourseImage";
import CourseInfo from "./CourseInfo";
import PriceList from "./PriceList";

function DriverCoursePage() {
  const navigation = useNavigate();
  const { courseId } = useParams();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [capacity, setCapacity] = useState(0);
  const [prices, setPrices] = useState([]);
  const [priceIndex, setPriceIndex] = useState(0);
  const [destinations, setDestinations] = useState([]);
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("");

  const getMyDriverInfo = async () => {
    try {
      const result = await getDriverMyInfo();
      setCapacity(result.payload.vehicleCapacity);
      setPrices(result.payload.prices);
      setLoading(false);
    } catch (e) {
      console.log(e);
      navigation("/", { replace: true });
    }
  };

  useEffect(() => {
    if (!prices[priceIndex]?.hours) return;

    const newEndTime =
      String(
        (Number(startTime.slice(0, 2)) + prices[priceIndex].hours) % 24
      ).padStart(2, "0") + startTime.slice(2);

    setEndTime(newEndTime);
  }, [startTime, prices[priceIndex]?.hours]);

  useEffect(() => {
    getMyDriverInfo();
  }, []);

  if (loading) return <Loading full={true} />;
  return (
    <PageContainer>
      <Title />
      <CourseImage images={images} setImages={setImages} />
      <CourseInfo title={"여행 기간"} content={"1일"} />
      <CourseInfo title={"최대 정원"} content={`${capacity}명`} />
      <CourseInfo
        title={"전체 파티 여행비"}
        content={
          <PriceList
            prices={prices}
            priceIndex={priceIndex}
            setPriceIndex={setPriceIndex}
          />
        }
      />
      <CourseInfo
        title={"나의 수익"}
        content={`${priceToString(prices[priceIndex].price * 0.983)}원`}
      />
      <CourseInfo
        title={"플랫폼 수수료"}
        content={`${priceToString(prices[priceIndex].price * 0.017)}원`}
      />
      <CourseDnD
        name={name}
        setName={setName}
        hours={prices[priceIndex].hours}
        destinations={destinations}
        setDestinations={setDestinations}
        startTime={startTime}
        endTime={endTime}
        setStartTime={setStartTime}
      />
      <EditMap courseData={destinations} setCourseData={setDestinations} />
      <SaveButton saveHandler={() => console.log("저장하기")} />
    </PageContainer>
  );
}

export default DriverCoursePage;
