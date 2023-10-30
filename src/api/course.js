import { GET } from "../utils/axios";

export const getCourseDetail = async (courseId) =>
  await GET(`/course/${courseId}`, true);
