import { DELETE, GET, POST, PUT } from "../utils/axios";

export const getArticleList = async (type, page) =>
  await GET(`/article?type=${type}&page=${page}`);

export const getArticleDetail = async (articleId) =>
  await GET(`/article/${articleId}`);

export const getMyArticleList = async (page) =>
  await GET(`/article/my?page=${page}`, true);

export const postNewArticle = async (body) =>
  await POST(`/article`, body, true);

export const updateMyArticle = async (articleId, body) =>
  await PUT(`/article/${articleId}`, body, true);

export const deleteMyArticle = async (articleId) =>
  await DELETE(`/article/${articleId}`, true);

export const postNewComment = async (articleId, comment) =>
  await POST(`/article/comment/${articleId}?content=${comment}`, {}, true);

export const deleteMyComment = async (commentId) =>
  await DELETE(`/article/comment/${commentId}`, true);

export const postNewReply = async (commentId, reply) =>
  await POST(`/article/reply/${commentId}?content=${reply}`, {}, true);

export const deleteMyReply = async (replyId) =>
  await DELETE(`/article/reply/${replyId}`, true);

export const likeArticle = async (articleId) =>
  await POST(`/article/dibs/${articleId}`, {}, true);

export const unLikeArticle = async (articleId) =>
  await DELETE(`/article/dibs/${articleId}`, true);

export const searchArticle = async (keyword, type, page) =>
  await GET(
    `/article/search?type=${type}&keyword=${keyword}&page=${page}`,
    true
  );
