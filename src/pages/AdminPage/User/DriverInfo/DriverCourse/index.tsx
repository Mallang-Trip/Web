import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getDriverCourseDetail,
  getDriverInfoDetail,
  postDriverNewCourse,
  putDriverCourseDetail,
} from "@/api/admin";
import { getCommisionRate } from "@/api/income";
import { uploadImage } from "@/api/image";
import { priceToString } from "@/utils";
import { PageContainer, ConfirmModal, CheckModal, Loading } from "@/components";
import EditMap from "@/pages/PartyPage/EditMap";
import CourseDnD from "@/pages/DriverCoursePage/CourseDnD";
import SaveButton from "@/pages/DriverCoursePage/SaveButton";
import Title from "@/pages/DriverCoursePage/Title";
import CourseImage from "@/pages/DriverCoursePage/CourseImage";
import CourseInfo from "@/pages/DriverCoursePage/CourseInfo";
import PriceList from "@/pages/DriverCoursePage/PriceList";
import DeleteButton from "./DeleteButton";

interface Destination {
  address: string;
  destinationId: number;
  lat: number;
  lon: number;
  name: string;
  image?: string | File;
}

function DriverCourse() {
  const navigation = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState("");
  const [name, setName] = useState("");
  const [images, setImages] = useState<(string | File)[]>([]);
  const [capacity, setCapacity] = useState(0);
  const [prices, setPrices] = useState<{ hours: number; price: number }[]>([]);
  const [priceIndex, setPriceIndex] = useState(0);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showCheckModal, setShowCheckModal] = useState(false);
  const [commissionRate, setCommissionRate] = useState(0);
  const [driverRegion, setDriverRegion] = useState<string[]>([]);
  const driverId = searchParams.get("driverId");
  const courseId = searchParams.get("courseId");

  const saveCourse = useCallback(async () => {
    if (!driverId || !courseId) return;

    const destinationImages = destinations.reduce(
      (acc: (string | File)[], cur: Destination) => {
        if (typeof cur.image === "string") {
          acc.push(cur.image);
        } else if (Array.isArray(cur.image) && cur.image.length > 0) {
          acc.push(cur.image[0]);
        }
        return acc;
      },
      []
    );

    if (name === "") {
      setErrorMessage("파티 코스 이름을 입력해주세요.");
      setShowErrorModal(true);
      return;
    }
    if (destinations.length < 3) {
      setErrorMessage("파티 코스에 여행지를 3개 이상 등록해주세요.");
      setShowErrorModal(true);
      return;
    }
    if (destinationImages.length === 0 && images.length === 0) {
      setErrorMessage("파티 코스 이미지를 1개 이상 업로드해주세요.");
      setShowErrorModal(true);
      return;
    }

    window.scrollTo({ top: 0 });
    setLoading(true);

    try {
      const imagesURL = await Promise.all(
        images.map(async (image) =>
          typeof image === "string" ? image : await uploadImage(image)
        )
      );
      const body = {
        capacity: capacity,
        days: [
          {
            day: 1,
            destinations: destinations.map(
              (destination) => destination.destinationId
            ),
            endTime: endTime,
            hours: prices[priceIndex].hours,
            price: prices[priceIndex].price,
            startTime: startTime,
          },
        ],
        region: region || driverRegion[0],
        images: [...imagesURL, ...destinationImages],
        name: name,
        totalDays: 1,
        totalPrice: prices[priceIndex].price,
      };

      const result =
        courseId === "new"
          ? await postDriverNewCourse(driverId, body)
          : await putDriverCourseDetail(driverId, courseId, body);

      navigation(
        `/admin/driver-info?driverId=${driverId}&courseId=${courseId === "new" ? result.payload.courseId : courseId}`,
        {
          replace: true,
        }
      );
      setErrorMessage(
        courseId === "new"
          ? "파티 코스가 등록되었습니다."
          : "파티 코스가 수정되었습니다."
      );
      setShowErrorModal(true);
    } catch (e) {
      console.log(e);
      setErrorMessage("파티 코스 등록에 실패했습니다.");
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  }, [
    destinations,
    name,
    images,
    capacity,
    startTime,
    endTime,
    prices,
    priceIndex,
    region,
    driverRegion,
    courseId,
    driverId,
  ]);

  const getDriverCourseInfo = useCallback(async () => {
    if (!driverId || !courseId) return;
    try {
      const driverResult = await getDriverInfoDetail(driverId);
      setCapacity(driverResult.payload.vehicleCapacity);
      setPrices(driverResult.payload.prices);
      setDriverRegion(driverResult.payload.region);

      if (courseId !== "new") {
        const courseResult = await getDriverCourseDetail(driverId, courseId);
        setName(courseResult.payload.name);
        setImages(courseResult.payload.images);
        setCapacity(courseResult.payload.capacity);
        setDestinations(courseResult.payload.days[0].destinations);
        setStartTime(courseResult.payload.days[0].startTime);
        setEndTime(courseResult.payload.days[0].endTime);

        const beforePriceIndex = driverResult.payload.prices.findIndex(
          (item: { hours: number; price: number }) =>
            item.hours === courseResult.payload.days[0].hours &&
            item.price === courseResult.payload.days[0].price
        );
        setPriceIndex(beforePriceIndex === -1 ? 0 : beforePriceIndex);
      } else {
        setName("");
        setImages([]);
        setPriceIndex(0);
        setDestinations([]);
        setStartTime("10:00");
        setEndTime("");
      }
    } catch (e) {
      console.log(e);
      navigation("/", { replace: true });
    } finally {
      setLoading(false);
    }
  }, [driverId, courseId]);

  const getCommisionRateFunc = useCallback(async () => {
    try {
      const result = await getCommisionRate();
      setCommissionRate(parseFloat(result.payload.partyCommissionPercent));
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (!prices[priceIndex]?.hours) return;

    const newEndTime =
      String(
        (Number(startTime.slice(0, 2)) + prices[priceIndex].hours) % 24
      ).padStart(2, "0") + startTime.slice(2);

    setEndTime(newEndTime);
  }, [startTime, prices[priceIndex]?.hours]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    getDriverCourseInfo();
    getCommisionRateFunc();
  }, [driverId, courseId]);

  if (loading) return <Loading full={true} />;
  return (
    <div className="text-base text-black font-medium">
      <PageContainer>
        <Title courseId={courseId || "0"} />
        <CourseImage images={images} setImages={setImages} />
        <CourseInfo title="여행 기간" content="1일" />
        <CourseInfo title="최대 정원" content={`${capacity}명`} />
        <CourseInfo
          title="전체 파티 여행비"
          content={
            <PriceList
              prices={prices}
              priceIndex={priceIndex}
              setPriceIndex={setPriceIndex}
            />
          }
        />
        <CourseInfo
          title="파티 가격"
          content={`${priceToString(prices[priceIndex].price)}원`}
        />
        <CourseInfo
          title="나의 수익"
          content={`${priceToString(prices[priceIndex].price * ((100 - commissionRate) / 100))}원`}
        />
        <CourseInfo
          title="플랫폼 수수료"
          content={`${priceToString(prices[priceIndex].price * (commissionRate / 100))}원 (${commissionRate}%)`}
        />
        <CourseDnD
          name={name}
          setName={setName}
          hours={prices[priceIndex].hours}
          destinations={destinations}
          setDestinations={setDestinations}
          startTime={startTime}
          endTime={endTime}
          setEndTime={setEndTime}
          setStartTime={setStartTime}
          baseTime={prices[priceIndex].hours || 0}
        />
        <EditMap
          courseData={destinations}
          setCourseData={setDestinations}
          setRegion={setRegion}
        />
        <SaveButton
          courseId={courseId || "0"}
          saveHandler={() => setShowCheckModal(true)}
        />
        <DeleteButton />

        <ConfirmModal
          showModal={showErrorModal}
          setShowModal={setShowErrorModal}
          message={errorMessage}
        />
        <CheckModal
          showModal={showCheckModal}
          setShowModal={setShowCheckModal}
          message={
            courseId === "new"
              ? "파티 코스를 등록하시겠습니까?"
              : "파티 코스를 수정하시겠습니까?"
          }
          noText="취소"
          yesText="확인"
          yesHandler={() => {
            setShowCheckModal(false);
            saveCourse();
          }}
        />
      </PageContainer>
    </div>
  );
}

export default memo(DriverCourse);
