import { useParams } from "react-router-dom";
import { getCourseDetail } from "../../api/course";
import PageContainer from "../../components/PageContainer";
import { useState } from "react";
import HeadTitle from "../CourseSuggestPage/HeadTitle";

function EditCoursePage() {
  let { courseId } = useParams();
  const getCourseInfo = async () => {
    try {
      const result = await getCourseDetail(courseId);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };
  useState(() => {
    getCourseInfo();
  }, [courseId]);
  return (
    <PageContainer>
      <HeadTitle name={"파티 수정하기"} isDriver={false} />
    </PageContainer>
  );
}

export default EditCoursePage;
