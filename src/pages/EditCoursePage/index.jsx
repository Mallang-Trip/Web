import { useNavigate, useParams } from "react-router-dom";
import { getCourseDetail } from "../../api/course";
import { getPartyDetail } from "../../api/party";
import PageContainer from "../../components/PageContainer";
import { useState, useEffect } from "react";
import HeadTitle from "../CourseSuggestPage/HeadTitle";
import PartyImageBox from "../../components/PartyImageBox";
import EditButton from "../../components/EditButton";
import PartyPlan from "../../components/PartyPlan";
import Period from "../PartyPage/Atoms/Period";
import EditPeriod from "../../components/EditPeriod";
import PartyNumber from "../PartyPage/Atoms/PartyNumber";
import PersonLimit from "../../components/PersonLimit";
import ToTalCredit from "../PartyPage/Atoms/ToTalCredit";
import Revenue from "./Revenue";
import Platform from "./Platform";
import CourseDnD from "../CourseSuggestPage/CourseDnD";
import Course from "../MyProfilePage/DriverProfile/PartyCourse/Course";
import PlaceMap from "../../components/PlaceMap";
import CheckModal from "../../components/CheckModal";
function EditCoursePage() {
  const [images, setImages] = useState([]);
  const [courseData, setCourseData] = useState({});
  const [partyData, setPartyData] = useState({});
  const [partyCourse, setPartyCourse] = useState({});
  const { courseId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");

  const navigate = useNavigate();
  const getCourseInfo = async () => {
    try {
      const result = await getCourseDetail(courseId);
      // console.log(result);
      setImages(result.payload.images);
      setCourseData(result.payload);
    } catch (e) {
      console.log(e);
    }
  };
  const getPartyData = async () => {
    try {
      const result = await getPartyDetail(courseId);
      console.log(result);
      setPartyData(result.payload);
      setPartyCourse(result.payload.course.days[0].destinations);
    } catch (e) {
      console.log(e);
    }
  };
  const onClickHandler = () => {
    navigate();
  };
  useEffect(() => {
    getCourseInfo();
  }, []);

  useEffect(() => {
    getPartyData();
  }, [courseId]);

  if (!courseData.courseId) return null;
  if (!partyData.partyId) return null;

  return (
    <PageContainer>
      <HeadTitle name={"파티 수정하기"} isDriver={false} />
      <PartyImageBox images={images} name={"gkgk"} />
      <div className="flex justify-center items-center pt-6">
        <EditButton title={"이미지 수정"} />
      </div>
      <EditPeriod />
      <PersonLimit capacity={courseData.capacity} />
      <ToTalCredit totalPrice={courseData.days[0].price} />
      <Platform />
      <CourseDnD
        name={partyData.course.name}
        course={partyData.course}
        startDate={partyData.startDate}
        courseData={partyCourse}
        setCourseData={setPartyCourse}
      />
      <PlaceMap search={true} newPlace={true} />
    </PageContainer>
  );
}

export default EditCoursePage;
