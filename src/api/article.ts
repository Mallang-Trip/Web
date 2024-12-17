import { DELETE, GET, POST, PUT } from "@/utils/axios";

export const getArticleList = async (type: string, page: number) =>
  await GET(`/article?type=${type}&page=${page}`);

export const getArticleDetail = async (articleId: string) =>
  await GET(`/article/${articleId}`, true);

export const getMyArticleList = async (page: number) =>
  await GET(`/article/my?page=${page}`, true);

export const getMyCommentList = async (page: number) =>
  await GET(`/article/comment/my?page=${page}`, true);

export const postNewArticle = async (body: any) =>
  await POST(`/article`, body, true);

export const updateMyArticle = async (articleId: string, body: any) =>
  await PUT(`/article/${articleId}`, body, true);

export const deleteMyArticle = async (articleId: number) =>
  await DELETE(`/article/${articleId}`, true);

export const postNewComment = async (articleId: string, comment: string) =>
  await POST(`/article/comment/${articleId}?content=${comment}`, {}, true);

export const deleteMyComment = async (commentId: number) =>
  await DELETE(`/article/comment/${commentId}`, true);

export const postNewReply = async (commentId: number, reply: string) =>
  await POST(`/article/reply/${commentId}?content=${reply}`, {}, true);

export const deleteMyReply = async (replyId: number) =>
  await DELETE(`/article/reply/${replyId}`, true);

export const searchArticle = async (
  keyword: string,
  type: string,
  page: number
) =>
  await GET(
    `/article/search?type=${type}&keyword=${keyword}&page=${page}`,
    true
  );
