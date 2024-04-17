import { DELETE, GET, POST, PUT } from "../utils/axios";

export const getCourseDetail = async (courseId) =>
  await GET(`/course/${courseId}`, true);

export const postNewCourse = async (data) => await POST("/course", data, true);

export const putCourseDetail = async (courseId, body) =>
  await PUT(`/course/${courseId}`, body, true);

export const deleteCourse = async (courseId) =>
  await DELETE(`/course/${courseId}`, true);
