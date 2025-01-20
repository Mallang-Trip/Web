import { memo, useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDriverMyInfo } from "@/api/driver";
import { getCourseDetail, postNewCourse, putCourseDetail } from "@/api/course";
import { getCommisionRate } from "@/api/income";
import { uploadImage } from "@/api/image";
import { priceToString } from "@/utils";
import { Destination } from "@/types";
import { PageContainer, ConfirmModal, CheckModal, Loading } from "@/components";
import EditMap from "@/pages/PartyPage/EditMap";
import CourseDnD from "./CourseDnD";
import SaveButton from "./SaveButton";
import DeleteButton from "./DeleteButton";
import Title from "./Title";
import CourseImage from "./CourseImage";
import CourseInfo from "./CourseInfo";
import PriceList from "./PriceList";

interface DestinationImage extends Destination {
  image?: string | File;
}

function DriverCoursePage() {
  const navigation = useNavigate();
  const { courseId } = useParams();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [images, setImages] = useState<(string | File)[]>([]);
  const [capacity, setCapacity] = useState(0);
  const [prices, setPrices] = useState<{ hours: number; price: number }[]>([]);
  const [priceIndex, setPriceIndex] = useState(0);
  const [destinations, setDestinations] = useState<DestinationImage[]>([]);
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showCheckModal, setShowCheckModal] = useState(false);
  const [commissionRate, setCommissionRate] = useState(0);
  const [driverRegion, setDriverRegion] = useState<string[]>([]);
  const [courseRegion, setCourseRegion] = useState("");

  const saveCourse = useCallback(async () => {
    if (!courseId) return;

    const destinationImages = destinations.reduce<string[]>((acc, cur) => {
      if (typeof cur.image === "string") {
        acc.push(cur.image);
      } else if (Array.isArray(cur.image) && cur.image.length > 0) {
        acc.push(cur.image[0]);
      }
      return acc;
    }, []);

    if (name === "") {
      setErrorMessage("일정 코스 이름을 입력해주세요.");
      setShowErrorModal(true);
      return;
    }
    if (destinations.length < 3) {
      setErrorMessage("일정 코스에 여행지를 3개 이상 등록해주세요.");
      setShowErrorModal(true);
      return;
    }
    if (destinationImages.length === 0 && images.length === 0) {
      setErrorMessage("일정 코스 이미지를 1개 이상 업로드해주세요.");
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
        region: courseRegion || driverRegion[0],
        images: [...imagesURL, ...destinationImages],
        name: name,
        totalDays: 1,
        totalPrice: prices[priceIndex].price,
      };

      const result =
        courseId === "new"
          ? await postNewCourse(body)
          : await putCourseDetail(courseId, body);

      navigation(
        `/my/driver/course/${courseId === "new" ? result.payload.courseId : courseId}`,
        {
          replace: true,
        }
      );
      setErrorMessage(
        courseId === "new"
          ? "일정 코스가 등록되었습니다."
          : "일정 코스가 수정되었습니다."
      );
      setShowErrorModal(true);
    } catch (e) {
      console.log(e);
      setErrorMessage("일정 코스 등록에 실패했습니다.");
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  }, [
    destinations,
    name,
    images,
    capacity,
    endTime,
    prices,
    priceIndex,
    startTime,
    courseRegion,
    driverRegion,
    courseId,
  ]);

  const getDriverCourseInfo = useCallback(async () => {
    try {
      const driverResult = await getDriverMyInfo();
      setCapacity(driverResult.payload.vehicleCapacity);
      setPrices(driverResult.payload.prices);
      setDriverRegion(driverResult.payload.region);

      if (courseId !== "new" && courseId) {
        const courseResult = await getCourseDetail(courseId);
        setCourseRegion(courseResult.payload.region);
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
        setCourseRegion("");
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
  }, [courseId]);

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
    getDriverCourseInfo();
    getCommisionRateFunc();
  }, []);

  if (loading) return <Loading full={true} />;
  return (
    <PageContainer>
      <Title courseId={courseId || "new"} />
      <CourseImage images={images} setImages={setImages} />
      <CourseInfo title="여행 기간" content="1일" />
      <CourseInfo title="최대 정원" content={`${capacity}명`} />
      <CourseInfo
        title="전체 일정 여행비"
        content={
          <PriceList
            prices={prices}
            priceIndex={priceIndex}
            setPriceIndex={setPriceIndex}
          />
        }
      />
      <CourseInfo
        title="일정 가격"
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
        setStartTime={setStartTime}
      />
      <EditMap
        courseData={destinations}
        setCourseData={setDestinations}
        setRegion={setCourseRegion}
      />
      <SaveButton
        courseId={courseId || "new"}
        saveHandler={() => setShowCheckModal(true)}
      />
      <DeleteButton courseId={courseId || "new"} />

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
            ? "일정 코스를 등록하시겠습니까?"
            : "일정 코스를 수정하시겠습니까?"
        }
        noText="취소"
        yesText="확인"
        yesHandler={() => {
          setShowCheckModal(false);
          saveCourse();
        }}
      />
    </PageContainer>
  );
}

export default memo(DriverCoursePage);
