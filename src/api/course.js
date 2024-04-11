import { GET, POST } from "../utils/axios";

export const getCourseDetail = async (courseId) =>
  await GET(`/course/${courseId}`, true);

export const postNewCourse = async (data) => await POST("/course", data, true);
