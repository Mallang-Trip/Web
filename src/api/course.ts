import { DELETE, GET, POST, PUT } from "@/utils/axios";

export const getCourseDetail = async (courseId: number | string) =>
  await GET(`/course/${courseId}`, true);

export const postNewCourse = async (body: any) =>
  await POST("/course", body, true);

export const putCourseDetail = async (courseId: string, body: any) =>
  await PUT(`/course/${courseId}`, body, true);

export const deleteCourse = async (courseId: string) =>
  await DELETE(`/course/${courseId}`, true);
