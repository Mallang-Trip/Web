import { useParams } from "react-router-dom";
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

function EditCoursePage() {
  const [images, setImages] = useState([]);
  const [courseData, setCourseData] = useState({});
  const [partyData, setPartyData] = useState({});
  const { courseId } = useParams();
  const getCourseInfo = async () => {
    try {
      const result = await getCourseDetail(courseId);
      setImages(result.payload.images);
      setCourseData(result.payload);
    } catch (e) {
      console.log(e);
    }
  };
  const getPartyData = async () => {
    try {
      const result = await getPartyDetail(courseId);
      console.log(result.payload);
      setPartyData(result.payload);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getCourseInfo();
  }, []);

  useEffect(() => {
    if (!partyData.partyId) return;
    getPartyData();
    console.log(partyData);
  }, []);

  if (!courseData.courseId) return null;

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
      <Revenue />
      <Platform />
    </PageContainer>
  );
}

export default EditCoursePage;
